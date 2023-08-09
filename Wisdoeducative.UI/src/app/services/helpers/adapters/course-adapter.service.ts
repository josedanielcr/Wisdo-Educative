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
      return new CourseClient(
          serverObj.id, 
          serverObj.studyPlanTermId, 
          this.studyPlanTermAdapter.adaptServerToClient(serverObj.studyPlanTerm),
          serverObj.courseScheduleId,
          serverObj.courseSchedule ? this.courseScheduleAdapter.adaptServerToClient(serverObj.courseSchedule) : undefined,
          serverObj.name, 
          serverObj.description,
          serverObj.totalCredits,
          serverObj.startDate, 
          serverObj.endDate,
          serverObj.currentScore,
          serverObj.price,
          serverObj.status, 
          serverObj.courseStatus
      );
  }

  public adaptClientToServer(clientObj: CourseClient): CourseServer {
      return new CourseServer(
          clientObj.id, 
          clientObj.studyPlanTermId, 
          this.studyPlanTermAdapter.adaptClientToServer(clientObj.studyPlanTerm),
          clientObj.courseScheduleId,
          clientObj.courseSchedule ? this.courseScheduleAdapter.adaptClientToServer(clientObj.courseSchedule) : undefined,
          clientObj.name, 
          clientObj.description,
          clientObj.totalCredits,
          clientObj.startDate, 
          clientObj.endDate,
          clientObj.currentScore,
          clientObj.price,
          clientObj.status, 
          clientObj.courseStatus
      );
  }
}