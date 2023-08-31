import { Injectable } from "@angular/core";
import { StudyPlanAdapterService } from "./study-plan-adapter.service";
import { StudyPlanTermServer } from "src/app/models/core/server/study.plan.term.server.model";
import { StudyPlanTermClient } from "src/app/models/core/client/study.plan.term.client.model";

@Injectable({
  providedIn: 'root'
})
export class StudyPlanTermAdapterService {

  constructor(private studyPlanAdapter: StudyPlanAdapterService) { }

  public adaptServerToClient(serverObj: StudyPlanTermServer): StudyPlanTermClient {
      let clientObj = new StudyPlanTermClient();
      clientObj.id = serverObj.id;
      clientObj.studyPlanId = serverObj.studyPlanId;
      clientObj.studyPlanDto = serverObj.studyPlan ? this.studyPlanAdapter.adaptServerToClient(serverObj.studyPlan) : null;
      clientObj.periodNumber = serverObj.periodNumber;
      clientObj.studyTermStatus = serverObj.studyTermStatus;
      clientObj.status = serverObj.status;
      clientObj.startDate = serverObj.startDate;
      clientObj.endDate = serverObj.endDate;
      clientObj.name = serverObj.name;
      return clientObj;
  }

  public adaptClientToServer(clientObj: StudyPlanTermClient): StudyPlanTermServer {
      let serverObj = new StudyPlanTermServer();
      serverObj.id = clientObj.id;
      serverObj.studyPlanId = clientObj.studyPlanId;
      serverObj.studyPlan = clientObj.studyPlanDto ? this.studyPlanAdapter.adaptClientToServer(clientObj.studyPlanDto) : null;
      serverObj.periodNumber = clientObj.periodNumber;
      serverObj.studyTermStatus = clientObj.studyTermStatus;
      serverObj.status = clientObj.status;
      serverObj.startDate = clientObj.startDate;
      serverObj.endDate = clientObj.endDate;
      serverObj.name = clientObj.name;
      return serverObj;
  }
}