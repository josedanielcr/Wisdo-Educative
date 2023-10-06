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
      clientObj.course = serverObj.course ? this.courseAdapter.adaptServerToClient(serverObj.course) : undefined;
      clientObj.name = serverObj.name || null;
      clientObj.description = serverObj.description || null;
      clientObj.weight = serverObj.weight || null;
      clientObj.status = serverObj.status || null;
      return clientObj;
  }

  public adaptClientToServer(clientObj: CourseEvaluationClient): CourseEvaluationServer {
      const serverObj = new CourseEvaluationServer();
      serverObj.id = clientObj.id;
      serverObj.courseId = clientObj.courseId;
      serverObj.course = clientObj.course ? this.courseAdapter.adaptClientToServer(clientObj.course) : undefined;
      serverObj.name = clientObj.name || null;
      serverObj.description = clientObj.description || null;
      serverObj.weight = clientObj.weight || null;
      serverObj.status = clientObj.status || null;
      return serverObj;
  }
}
