import { Injectable } from '@angular/core';
import { UserDegreeAdapterService } from './user-degree-adapter.service';
import { StudyPlanServer } from 'src/app/models/core/server/study.plan.server.model';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { GradingSystemAdapterService } from './grading-system-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanAdapterService {

  constructor(private userDegreeAdapter: UserDegreeAdapterService,
    private gradingSystemAdapter: GradingSystemAdapterService) { }

  public adaptServerToClient(serverObj: StudyPlanServer): StudyPlanClient {
    const clientObj = new StudyPlanClient();
    clientObj.id = serverObj.id;
    clientObj.userDegreeId = serverObj.userDegreeId;
    clientObj.userDegree = serverObj.userDegree ? this.userDegreeAdapter.adaptUserDegreeServerToClient(serverObj.userDegree) : null;
    clientObj.gradingSystemId = serverObj.gradingSystemId;
    clientObj.gradingSystem = serverObj.gradingSystem ? this.gradingSystemAdapter.adaptServerToClient(serverObj.gradingSystem) : null;
    clientObj.totalCredits = serverObj.totalCredits;
    clientObj.earnedCredits = serverObj.earnedCredits;
    clientObj.status = serverObj.status;
    return clientObj;
  }

  public adaptClientToServer(clientObj: StudyPlanClient): StudyPlanServer {
    const serverObj = new StudyPlanServer();
    serverObj.id = clientObj.id;
    serverObj.userDegreeId = clientObj.userDegreeId;
    serverObj.userDegree = clientObj.userDegree ? this.userDegreeAdapter.adaptUserDegreeClientToServer(clientObj.userDegree) : null;
    serverObj.gradingSystemId = clientObj.gradingSystemId;
    serverObj.gradingSystem = clientObj.gradingSystem ? this.gradingSystemAdapter.adaptClientToServer(clientObj.gradingSystem) : null;
    serverObj.totalCredits = clientObj.totalCredits;
    serverObj.earnedCredits = clientObj.earnedCredits;
    serverObj.status = clientObj.status;
    return serverObj;
  }
}
