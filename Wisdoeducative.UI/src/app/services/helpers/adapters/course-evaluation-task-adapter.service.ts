import { Injectable, Injector } from '@angular/core';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { CourseEvaluationTaskServer } from 'src/app/models/core/server/course.evaluation.task.server.model';
import { CourseEvaluationAdapterService } from './course-evaluation-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class CourseEvaluationTaskAdapterService {

  constructor(private injector : Injector) { }

  private getCourseEvaluationAdapterService() {
    return this.injector.get(CourseEvaluationAdapterService);
  }

  public adaptServerToClient(courseEvaluationTaskServer : CourseEvaluationTaskServer){
    const courseEvaluationTaskClient = new CourseEvaluationTaskClient();
    courseEvaluationTaskClient.id = courseEvaluationTaskServer.id;
    courseEvaluationTaskClient.name = courseEvaluationTaskServer.name;
    courseEvaluationTaskClient.description = courseEvaluationTaskServer.description;
    courseEvaluationTaskClient.courseEvaluationId = courseEvaluationTaskServer.courseEvaluationId;
    courseEvaluationTaskClient.courseEvaluation = courseEvaluationTaskServer.courseEvaluation
     ? this.getCourseEvaluationAdapterService().adaptServerToClient(courseEvaluationTaskServer.courseEvaluation) : undefined;
    courseEvaluationTaskClient.weight = courseEvaluationTaskServer.weight;
    courseEvaluationTaskClient.totalScore = courseEvaluationTaskServer.totalScore;
    courseEvaluationTaskClient.startDate = courseEvaluationTaskServer.startDate;
    courseEvaluationTaskClient.endDate = courseEvaluationTaskServer.endDate;
    courseEvaluationTaskClient.status = courseEvaluationTaskServer.status;
    courseEvaluationTaskClient.evaluationStatus = courseEvaluationTaskServer.evaluationStatus;
    return courseEvaluationTaskClient;
  }

  public adaptClientToServer(courseEvaluationTaskClient : CourseEvaluationTaskClient){
    const courseEvaluationTaskServer = new CourseEvaluationTaskServer();
    courseEvaluationTaskServer.id = courseEvaluationTaskClient.id;
    courseEvaluationTaskServer.name = courseEvaluationTaskClient.name;
    courseEvaluationTaskServer.description = courseEvaluationTaskClient.description;
    courseEvaluationTaskServer.courseEvaluationId = courseEvaluationTaskClient.courseEvaluationId;
    courseEvaluationTaskServer.courseEvaluation = courseEvaluationTaskClient.courseEvaluation
     ? this.getCourseEvaluationAdapterService().adaptClientToServer(courseEvaluationTaskClient.courseEvaluation) : undefined;
    courseEvaluationTaskServer.weight = courseEvaluationTaskClient.weight;
    courseEvaluationTaskServer.totalScore = courseEvaluationTaskClient.totalScore;
    courseEvaluationTaskServer.startDate = courseEvaluationTaskClient.startDate;
    courseEvaluationTaskServer.endDate = courseEvaluationTaskClient.endDate;
    courseEvaluationTaskServer.status = courseEvaluationTaskClient.status;
    courseEvaluationTaskServer.evaluationStatus = courseEvaluationTaskClient.evaluationStatus;
    return courseEvaluationTaskServer;
  }
}
