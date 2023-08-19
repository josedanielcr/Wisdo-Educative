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
      serverObj.userDegree ? this.userDegreeAdapter.adaptUserDegreeServerToClient(serverObj.userDegree) : null,
      serverObj.gradingSystemId,
      serverObj.gradingSystem ? this.gradingSystemAdapter.adaptServerToClient(serverObj.gradingSystem) : null,
      serverObj.totalCredits,
      serverObj.earnedCredits,
      serverObj.status
    );
  }

  public adaptClientToServer(clientObj: StudyPlanClient): StudyPlanServer {
    return new StudyPlanServer(
      clientObj.id,
      clientObj.userDegreeId,
      clientObj.userDegree ? this.userDegreeAdapter.adaptUserDegreeClientToServer(clientObj.userDegree) : null,
      clientObj.gradingSystemId,
      clientObj.gradingSystem ? this.gradingSystemAdapter.adaptClientToServer(clientObj.gradingSystem) : null,
      clientObj.totalCredits,
      clientObj.earnedCredits,
      clientObj.status
    );
  }
}
