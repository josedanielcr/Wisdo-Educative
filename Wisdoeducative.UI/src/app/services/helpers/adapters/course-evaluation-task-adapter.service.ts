import { Injectable } from '@angular/core';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { CourseEvaluationTaskServer } from 'src/app/models/core/server/course.evaluation.task.server.model';
import { CourseEvaluationAdapterService } from './course-evaluation-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class CourseEvaluationTaskAdapterService {

  constructor(private courseEvaluationAdapterService : CourseEvaluationAdapterService) { }

  public adaptServerToClient(courseEvaluationTaskServer : CourseEvaluationTaskServer){
    const courseEvaluationTaskClient = new CourseEvaluationTaskClient();
    courseEvaluationTaskClient.id = courseEvaluationTaskServer.id;
    courseEvaluationTaskClient.name = courseEvaluationTaskServer.name;
    courseEvaluationTaskClient.description = courseEvaluationTaskServer.description;
    courseEvaluationTaskClient.courseEvaluationId = courseEvaluationTaskServer.courseEvaluationId;
    courseEvaluationTaskClient.courseEvaluation = courseEvaluationTaskServer.courseEvaluation ? this.courseEvaluationAdapterService.adaptServerToClient(courseEvaluationTaskServer.courseEvaluation) : undefined;
    courseEvaluationTaskClient.weight = courseEvaluationTaskServer.weight;
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
    courseEvaluationTaskServer.courseEvaluation = courseEvaluationTaskClient.courseEvaluation ? this.courseEvaluationAdapterService.adaptClientToServer(courseEvaluationTaskClient.courseEvaluation) : undefined;
    courseEvaluationTaskServer.weight = courseEvaluationTaskClient.weight;
    courseEvaluationTaskServer.status = courseEvaluationTaskClient.status;
    courseEvaluationTaskServer.evaluationStatus = courseEvaluationTaskClient.evaluationStatus;
    return courseEvaluationTaskServer;
  }
}
