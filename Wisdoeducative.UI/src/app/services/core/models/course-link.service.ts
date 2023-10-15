import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../helpers/api-url.service';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { SpinnerService } from '../spinner.service';
import { CourseLinkAdapterService } from '../../helpers/adapters/course-link-adapter.service';
import { CourseLinkClient } from 'src/app/models/core/client/course.link.client.model';
import { Observable, catchError, finalize, map } from 'rxjs';
import { CourseLinkServer } from 'src/app/models/core/server/course.link.server.model';

@Injectable({
  providedIn: 'root'
})
export class CourseLinkService {

  constructor(private http : HttpClient,
    private apiUrlService : ApiUrlService,
    private applicationErrorService : ApplicationErrorService,
    private spinnerService : SpinnerService,
    private courseLinkAdapter : CourseLinkAdapterService) { }

  public createCourseLink( courseLink : CourseLinkClient) : Observable<CourseLinkClient>{
    this.spinnerService.show();
    return this.http.post<CourseLinkClient>(
      `${this.apiUrlService.checkEnvironment()}/CourseLink`,
      courseLink)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courseLink : CourseLinkServer) => {
          return this.courseLinkAdapter.adaptServerToClient(courseLink);
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }

  public getCourseLinks(courseId : number): Observable<CourseLinkClient[]>{
    this.spinnerService.show();
    return this.http.get<CourseLinkClient[]>(
      `${this.apiUrlService.checkEnvironment()}/CourseLink/${courseId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courseLinks : CourseLinkServer[]) => {
          return courseLinks.map((courseLink : CourseLinkClient) => {
            return this.courseLinkAdapter.adaptServerToClient(courseLink);
          });
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }

  public getCourseLinksByCourseId(courseId : number): Observable<CourseLinkClient[]>{
    this.spinnerService.show();
    return this.http.get<CourseLinkClient[]>(
      `${this.apiUrlService.checkEnvironment()}/CourseLink/course/${courseId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courseLink : CourseLinkServer[]) => {
          return courseLink.map((courseLink : CourseLinkClient) => {
            return this.courseLinkAdapter.adaptServerToClient(courseLink);
          });
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }

  public deleteCourseLink(courseLinkId : number): Observable<boolean>{
    this.spinnerService.show();
    return this.http.delete<boolean>(
      `${this.apiUrlService.checkEnvironment()}/CourseLink/${courseLinkId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }

   public updateCourseLink(linkToUpdateId : number, courseLink : CourseLinkClient): Observable<CourseLinkClient>{
    this.spinnerService.show();
    return this.http.put<CourseLinkClient>(
      `${this.apiUrlService.checkEnvironment()}/CourseLink/${linkToUpdateId}`,
      courseLink)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courseLink : CourseLinkServer) => {
          return this.courseLinkAdapter.adaptServerToClient(courseLink);
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }
}