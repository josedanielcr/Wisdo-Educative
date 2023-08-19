import { Injectable } from '@angular/core';
import { StudyPlanAdapterService } from './study-plan-adapter.service';
import { StudyPlanTermServer } from 'src/app/models/core/server/study.plan.term.server.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanTermAdapterService {

  constructor(private studyPlanAdapter: StudyPlanAdapterService) { }

  public adaptServerToClient(serverObj: StudyPlanTermServer): StudyPlanTermClient {
      return new StudyPlanTermClient(
          serverObj.id, 
          serverObj.studyPlanId, 
          serverObj.studyPlan ? this.studyPlanAdapter.adaptServerToClient(serverObj.studyPlan) : null,
          serverObj.periodNumber, 
          serverObj.studyTermStatus, 
          serverObj.status
      );
  }

  public adaptClientToServer(clientObj: StudyPlanTermClient): StudyPlanTermServer {
      return new StudyPlanTermServer(
          clientObj.id, 
          clientObj.studyPlanId, 
          clientObj.studyPlan ? this.studyPlanAdapter.adaptClientToServer(clientObj.studyPlan) : null,
          clientObj.periodNumber, 
          clientObj.studyTermStatus, 
          clientObj.status
      );
  }
}