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
      clientObj.studyPlanTerm = this.studyPlanTermAdapter.adaptServerToClient(serverObj.studyPlanTerm);
      clientObj.courseScheduleId = serverObj.courseScheduleId;
      clientObj.courseSchedule = serverObj.courseSchedule ? this.courseScheduleAdapter.adaptServerToClient(serverObj.courseSchedule) : undefined;
      clientObj.name = serverObj.name;
      clientObj.totalCredits = serverObj.totalCredits;
      clientObj.currentScore = serverObj.currentScore;
      clientObj.status = serverObj.status;
      clientObj.courseStatus = serverObj.courseStatus;
      return clientObj;
  }

  public adaptClientToServer(clientObj: CourseClient): CourseServer {
      const serverObj = new CourseServer();
      serverObj.id = clientObj.id;
      serverObj.studyPlanTermId = clientObj.studyPlanTermId;
      serverObj.studyPlanTerm = this.studyPlanTermAdapter.adaptClientToServer(clientObj.studyPlanTerm);
      serverObj.courseScheduleId = clientObj.courseScheduleId;
      serverObj.courseSchedule = clientObj.courseSchedule ? this.courseScheduleAdapter.adaptClientToServer(clientObj.courseSchedule) : undefined;
      serverObj.name = clientObj.name;
      serverObj.totalCredits = clientObj.totalCredits;
      serverObj.currentScore = clientObj.currentScore;
      serverObj.status = clientObj.status;
      serverObj.courseStatus = clientObj.courseStatus;
      return serverObj;
  }
}
