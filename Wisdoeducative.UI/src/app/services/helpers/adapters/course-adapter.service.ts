import { Injectable } from '@angular/core';
import { StudyPlanTermAdapterService } from './study-plan-term-adapter.service';
import { CourseServer } from 'src/app/models/core/server/course.server.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
@Injectable({
  providedIn: 'root'
})
export class CourseAdapterService {

  constructor(private studyPlanTermAdapter: StudyPlanTermAdapterService) { }

  public adaptServerToClient(serverObj: CourseServer): CourseClient {
      const clientObj = new CourseClient();
      clientObj.id = serverObj.id;
      clientObj.studyPlanTermId = serverObj.studyPlanTermId;
      clientObj.studyPlanTermDto = serverObj.studyPlanTermDto ? this.studyPlanTermAdapter.adaptServerToClient(serverObj.studyPlanTermDto): undefined;
      clientObj.name = serverObj.name || null;
      clientObj.totalCredits = serverObj.totalCredits || null;
      clientObj.currentScore = serverObj.currentScore || null;
      clientObj.status = serverObj.status || null;
      clientObj.isFavorite = serverObj.isFavorite || null;
      clientObj.courseStatus = serverObj.courseStatus || null;
      return clientObj;
  }

  public adaptClientToServer(clientObj: CourseClient): CourseServer {
      const serverObj = new CourseServer();
      serverObj.id = clientObj.id || null;
      serverObj.studyPlanTermId = clientObj.studyPlanTermId || null;;
      serverObj.studyPlanTermDto = clientObj.studyPlanTermDto ? this.studyPlanTermAdapter.adaptClientToServer(clientObj.studyPlanTermDto) : undefined;
      serverObj.name = clientObj.name || null;
      serverObj.totalCredits = clientObj.totalCredits || null;
      serverObj.currentScore = clientObj.currentScore || null;
      serverObj.isFavorite = clientObj.isFavorite || null;
      serverObj.status = clientObj.status || null;
      serverObj.courseStatus = clientObj.courseStatus || null;
      return serverObj;
  }
}
