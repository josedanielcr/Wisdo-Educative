import { Injectable } from '@angular/core';
import { CourseAdapterService } from '../../helpers/adapters/course-adapter.service';
import { ApiUrlService } from '../../helpers/api-url.service';
import { HttpClient } from '@angular/common/http';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { CourseServer } from 'src/app/models/core/server/course.server.model';
import { Observable, catchError, map } from 'rxjs';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { CourseSearchModel } from 'src/app/models/utils/course.search.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http : HttpClient,
    private apiUrlService : ApiUrlService,
    private courseAdapter : CourseAdapterService,
    private applicationErrorService : ApplicationErrorService) { }


  public getStudyPlanTermCourses(studyPlanTermId : number) {
    return this.http.get<CourseServer[]>(`${this.apiUrlService.checkEnvironment()}/Course/${studyPlanTermId}`)
      .pipe(
        map((courses : CourseServer[]) => {
          return courses.map(course => this.courseAdapter.adaptServerToClient(course));
        }),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
      )
  }

  public searchCouse(studyPlanId : number, courseSearchModel : CourseSearchModel): Observable<CourseClient[]> {
    return this.http.post<CourseServer[]>(`${this.apiUrlService.checkEnvironment()}/Course/Search/${studyPlanId}`,
      courseSearchModel)
      .pipe(
        map((courses : CourseServer[]) => {
          return courses.map(course => this.courseAdapter.adaptServerToClient(course));
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }
}
