import { Injectable } from '@angular/core';
import { CourseEvaluationClient } from 'src/app/models/core/client/course.evaluation.client.model';
import { CourseEvaluationServer } from 'src/app/models/core/server/course.evaluation.server.model';
import { CourseAdapterService } from './course-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class CourseEvaluationAdapterService {

  constructor(private courseAdapter: CourseAdapterService) { }

  public adaptServerToClient(serverObj: CourseEvaluationServer): CourseEvaluationClient {
      const clientObj = new CourseEvaluationClient();
      clientObj.id = serverObj.id;
      clientObj.courseId = serverObj.courseId;
      clientObj.course = this.courseAdapter.adaptServerToClient(serverObj.course);
      clientObj.name = serverObj.name;
      clientObj.description = serverObj.description;
      clientObj.weight = serverObj.weight;
      clientObj.status = serverObj.status;
      return clientObj;
  }

  public adaptClientToServer(clientObj: CourseEvaluationClient): CourseEvaluationServer {
      const serverObj = new CourseEvaluationServer();
      serverObj.id = clientObj.id;
      serverObj.courseId = clientObj.courseId;
      serverObj.course = this.courseAdapter.adaptClientToServer(clientObj.course);
      serverObj.name = clientObj.name;
      serverObj.description = clientObj.description;
      serverObj.weight = clientObj.weight;
      serverObj.status = clientObj.status;
      return serverObj;
  }
}
