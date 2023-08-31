import { Injectable } from '@angular/core';
import { StudyPlanTermAdapterService } from './study-plan-term-adapter.service';
import { CourseServer } from 'src/app/models/core/server/course.server.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { CourseScheduleAdapterService } from './course-schedule-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class CourseAdapterService {

  constructor(private studyPlanTermAdapter: StudyPlanTermAdapterService, private courseScheduleAdapter: CourseScheduleAdapterService) { }

  public adaptServerToClient(serverObj: CourseServer): CourseClient {
      const clientObj = new CourseClient();
      clientObj.id = serverObj.id;
      clientObj.studyPlanTermId = serverObj.studyPlanTermId;
      clientObj.studyPlanTerm = serverObj.studyPlanTerm ? this.studyPlanTermAdapter.adaptServerToClient(serverObj.studyPlanTerm): undefined;
      clientObj.courseScheduleId = serverObj.courseScheduleId || null;
      clientObj.courseSchedule = serverObj.courseSchedule ? this.courseScheduleAdapter.adaptServerToClient(serverObj.courseSchedule) : undefined;
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
      serverObj.studyPlanTerm = clientObj.studyPlanTerm ? this.studyPlanTermAdapter.adaptClientToServer(clientObj.studyPlanTerm) : undefined;
      serverObj.courseScheduleId = clientObj.courseScheduleId || null;
      serverObj.courseSchedule = clientObj.courseSchedule ? this.courseScheduleAdapter.adaptClientToServer(clientObj.courseSchedule) : undefined;
      serverObj.name = clientObj.name || null;
      serverObj.totalCredits = clientObj.totalCredits || null;
      serverObj.currentScore = clientObj.currentScore || null;
      serverObj.isFavorite = clientObj.isFavorite || null;
      serverObj.status = clientObj.status || null;
      serverObj.courseStatus = clientObj.courseStatus || null;
      return serverObj;
  }
}
