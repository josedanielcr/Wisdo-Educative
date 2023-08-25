import { Injectable } from '@angular/core';
import { CourseAdapterService } from './course-adapter.service';
import { CoursePrerequisiteServer } from 'src/app/models/core/server/course.prerequisite.server.model';
import { CoursePrerequisiteClient } from 'src/app/models/core/client/course.prerequisite.client.model';

@Injectable({
  providedIn: 'root'
})
export class CoursePrerequisiteAdapterService {

  constructor(private courseAdapter: CourseAdapterService) { } 

  public adaptServerToClient(serverObj: CoursePrerequisiteServer): CoursePrerequisiteClient {
      const clientObj = new CoursePrerequisiteClient();
      clientObj.id = serverObj.id;
      clientObj.courseId = serverObj.courseId;
      clientObj.course = this.courseAdapter.adaptServerToClient(serverObj.course);
      clientObj.prerequisiteOfId = serverObj.prerequisiteOfId;
      clientObj.prerequisiteOf = this.courseAdapter.adaptServerToClient(serverObj.prerequisiteOf);
      return clientObj;
  }

  public adaptClientToServer(clientObj: CoursePrerequisiteClient): CoursePrerequisiteServer {
      const serverObj = new CoursePrerequisiteServer();
      serverObj.id = clientObj.id;
      serverObj.courseId = clientObj.courseId;
      serverObj.course = this.courseAdapter.adaptClientToServer(clientObj.course);
      serverObj.prerequisiteOfId = clientObj.prerequisiteOfId;
      serverObj.prerequisiteOf = this.courseAdapter.adaptClientToServer(clientObj.prerequisiteOf);
      return serverObj;
  }
}
