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
    return new StudyPlanClient(
      serverObj.id,
      serverObj.userDegreeId,
      this.userDegreeAdapter.adaptUserDegreeServerToClient(serverObj.userDegree),
      serverObj.gradingSystemId,
      this.gradingSystemAdapter.adaptServerToClient(serverObj.gradingSystem),
      serverObj.totalCredits,
      serverObj.earnedCredits,
      serverObj.status
    );
  }

  public adaptClientToServer(clientObj: StudyPlanClient): StudyPlanServer {
    return new StudyPlanServer(
      clientObj.id,
      clientObj.userDegreeId,
      this.userDegreeAdapter.adaptUserDegreeClientToServer(clientObj.userDegree),
      clientObj.gradingSystemId,
      this.gradingSystemAdapter.adaptClientToServer(clientObj.gradingSystem),
      clientObj.totalCredits,
      clientObj.earnedCredits,
      clientObj.status
    );
  }
}