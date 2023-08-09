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
      return new CoursePrerequisiteClient(
          serverObj.id, 
          serverObj.courseId, 
          this.courseAdapter.adaptServerToClient(serverObj.course),
          serverObj.prerequisiteOfId,
          this.courseAdapter.adaptServerToClient(serverObj.prerequisiteOf)
      );
  }

  public adaptClientToServer(clientObj: CoursePrerequisiteClient): CoursePrerequisiteServer {
      return new CoursePrerequisiteServer(
          clientObj.id, 
          clientObj.courseId, 
          this.courseAdapter.adaptClientToServer(clientObj.course),
          clientObj.prerequisiteOfId,
          this.courseAdapter.adaptClientToServer(clientObj.prerequisiteOf)
      );
  }
}