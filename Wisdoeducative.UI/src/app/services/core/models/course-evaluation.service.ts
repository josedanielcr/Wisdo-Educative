import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../helpers/api-url.service';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { SpinnerService } from '../spinner.service';
import { CourseEvaluationClient } from 'src/app/models/core/client/course.evaluation.client.model';
import { Observable, catchError, finalize, map } from 'rxjs';
import { CourseEvaluationServer } from 'src/app/models/core/server/course.evaluation.server.model';
import { CourseEvaluationAdapterService } from '../../helpers/adapters/course-evaluation-adapter.service';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { CourseEvaluationTaskServer } from 'src/app/models/core/server/course.evaluation.task.server.model';
import { CourseEvaluationTaskAdapterService } from '../../helpers/adapters/course-evaluation-task-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class CourseEvaluationService {

  constructor(private http : HttpClient,
    private apiUrlService : ApiUrlService,
    private applicationErrorService : ApplicationErrorService,
    private spinnerService : SpinnerService,
    private courseEvaluationAdapter : CourseEvaluationAdapterService,
    private courseEvaluationTaskAdapter : CourseEvaluationTaskAdapterService) { }

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

  public createCourseEvaluationTask(courseEvaluationId : number, courseEvaluationTask : CourseEvaluationTaskClient): Observable<CourseEvaluationTaskClient>{
    this.spinnerService.show();
    return this.http.post<CourseEvaluationTaskClient>(
      `${this.apiUrlService.checkEnvironment()}/CourseEvaluation/task/${courseEvaluationId}`,
      courseEvaluationTask)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courseEvaluation : CourseEvaluationTaskServer) => {
          return this.courseEvaluationTaskAdapter.adaptServerToClient(courseEvaluation);
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }

  public getCourseEvaluationTasks(courseEvaluationId : number): Observable<CourseEvaluationTaskClient[]>{
    this.spinnerService.show();
    return this.http.get<CourseEvaluationTaskClient[]>(
      `${this.apiUrlService.checkEnvironment()}/CourseEvaluation/task/${courseEvaluationId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((courseEvaluationTasks : CourseEvaluationTaskServer[]) => {
          return courseEvaluationTasks.map((courseEvaluationTask : CourseEvaluationTaskServer) => {
            return this.courseEvaluationTaskAdapter.adaptServerToClient(courseEvaluationTask);
          });
        }),
        catchError((error: any) => {
          throw this.applicationErrorService.parseHttpError(error)
        })
      )
  }
}
