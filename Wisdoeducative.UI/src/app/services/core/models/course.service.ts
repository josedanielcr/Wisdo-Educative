import { Injectable } from '@angular/core';
import { CourseAdapterService } from '../../helpers/adapters/course-adapter.service';
import { ApiUrlService } from '../../helpers/api-url.service';
import { HttpClient } from '@angular/common/http';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { CourseServer } from 'src/app/models/core/server/course.server.model';
import { Observable, catchError, finalize, map } from 'rxjs';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { CourseSearchModel } from 'src/app/models/utils/course.search.model';
import { SpinnerService } from '../spinner.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http : HttpClient,
    private apiUrlService : ApiUrlService,
    private courseAdapter : CourseAdapterService,
    private applicationErrorService : ApplicationErrorService,
    private spinnerService : SpinnerService) { }


  public getCourseById(courseId : number) : Observable<CourseClient> {
    return this.http.get<CourseServer>(`${this.apiUrlService.checkEnvironment()}/Course/${courseId}`)
      .pipe(
        map((course : CourseServer) => {
          return this.courseAdapter.adaptServerToClient(course);
        }),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
      )
  }

  public getStudyPlanTermCourses(studyPlanTermId : number) {
    this.spinnerService.show();
    return this.http.get<CourseServer[]>(`${this.apiUrlService.checkEnvironment()}/Course/study-plan-term/${studyPlanTermId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courses : CourseServer[]) => {
          return courses.map(course => this.courseAdapter.adaptServerToClient(course));
        }),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
      )
  }

  public searchCouse(studyPlanId : number, courseSearchModel : CourseSearchModel): Observable<CourseClient[]> {
    this.spinnerService.show();
    return this.http.post<CourseServer[]>(`${this.apiUrlService.checkEnvironment()}/Course/Search/${studyPlanId}`,
      courseSearchModel)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courses : CourseServer[]) => {
          return courses.map(course => this.courseAdapter.adaptServerToClient(course));
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }

  public addToFavorite(courseId : number) : Observable<CourseClient>{
    this.spinnerService.show();
    return this.http.post(`${this.apiUrlService.checkEnvironment()}/Course/add-favorite/${courseId}`, null)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((course : CourseServer) => {
          return this.courseAdapter.adaptServerToClient(course);
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }

  public getCoursesByStudyPlanId(studyPlanId : number) : Observable<CourseClient[]> {
    this.spinnerService.show();
    return this.http.get<CourseServer[]>(`${this.apiUrlService.checkEnvironment()}/Course/study-plan/${studyPlanId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courses : CourseServer[]) => {
          return courses.map(course => this.courseAdapter.adaptServerToClient(course));
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }

  public setGrade(courseId : number, grade : any): Observable<CourseClient>{
    this.spinnerService.show();
    return this.http.put(`${this.apiUrlService.checkEnvironment()}/Course/set-grade/${courseId}`, grade)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((course : CourseServer) => {
          return this.courseAdapter.adaptServerToClient(course);
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }
}
