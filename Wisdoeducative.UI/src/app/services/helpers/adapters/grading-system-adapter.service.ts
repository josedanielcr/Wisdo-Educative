import { Injectable } from '@angular/core';
import { GradingSystemClient } from 'src/app/models/core/client/grading.system.client.model';
import { GradingSystemServer } from 'src/app/models/core/server/grading.system.server.model';

@Injectable({
  providedIn: 'root'
})
export class GradingSystemAdapterService {

  constructor() { }

  public adaptServerToClient(serverObj: GradingSystemServer): GradingSystemClient {
      const clientObj = new GradingSystemClient();
      clientObj.id = serverObj.id;
      clientObj.name = serverObj.name;
      clientObj.description = serverObj.description;
      clientObj.minimumScore = serverObj.minimumScore;
      clientObj.maximiumScore = serverObj.maximiumScore;
      clientObj.passingGrade = serverObj.passingGrade;
      clientObj.status = serverObj.status;
      return clientObj;
  }

  public adaptClientToServer(clientObj: GradingSystemClient): GradingSystemServer {
      const serverObj = new GradingSystemServer();
      serverObj.id = clientObj.id;
      serverObj.name = clientObj.name;
      serverObj.description = clientObj.description;
      serverObj.minimumScore = clientObj.minimumScore;
      serverObj.maximiumScore = clientObj.maximiumScore;
      serverObj.passingGrade = clientObj.passingGrade;
      serverObj.status = clientObj.status;
      return serverObj;
  }
}
