import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../helpers/api-url.service';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { SpinnerService } from '../spinner.service';
import { CourseLinkAdapterService } from '../../helpers/adapters/course-link-adapter.service';
import { CourseLinkClient } from 'src/app/models/core/client/course.link.client.model';
import { Observable, catchError, finalize, map } from 'rxjs';

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
        map((courseLink : CourseLinkClient) => {
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
        map((courseLinks : CourseLinkClient[]) => {
          return courseLinks.map((courseLink : CourseLinkClient) => {
            return this.courseLinkAdapter.adaptServerToClient(courseLink);
          });
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }
}
