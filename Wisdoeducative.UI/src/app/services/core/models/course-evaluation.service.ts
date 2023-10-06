import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../helpers/api-url.service';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { SpinnerService } from '../spinner.service';
import { CourseEvaluationClient } from 'src/app/models/core/client/course.evaluation.client.model';
import { Observable, catchError, finalize, map } from 'rxjs';
import { CourseEvaluationServer } from 'src/app/models/core/server/course.evaluation.server.model';
import { CourseEvaluationAdapterService } from '../../helpers/adapters/course-evaluation-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class CourseEvaluationService {

  constructor(private http : HttpClient,
    private apiUrlService : ApiUrlService,
    private applicationErrorService : ApplicationErrorService,
    private spinnerService : SpinnerService,
    private courseEvaluationAdapter : CourseEvaluationAdapterService) { }

  public createCourseEvaluation(courseId : number, courseEvaluation : CourseEvaluationClient): Observable<CourseEvaluationClient>{
    this.spinnerService.show();
    return this.http.post<CourseEvaluationClient>(
      `${this.apiUrlService.checkEnvironment()}/CourseEvaluation/${courseId}`,
      courseEvaluation)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courseEvaluation : CourseEvaluationServer) => {
          return this.courseEvaluationAdapter.adaptServerToClient(courseEvaluation);
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }

  public getCourseEvaluations(courseId : number): Observable<CourseEvaluationClient[]>{
    this.spinnerService.show();
    return this.http.get<CourseEvaluationClient[]>(
      `${this.apiUrlService.checkEnvironment()}/CourseEvaluation/${courseId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courseEvaluations : CourseEvaluationServer[]) => {
          return courseEvaluations.map((courseEvaluation : CourseEvaluationServer) => {
            return this.courseEvaluationAdapter.adaptServerToClient(courseEvaluation);
          });
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }
}
