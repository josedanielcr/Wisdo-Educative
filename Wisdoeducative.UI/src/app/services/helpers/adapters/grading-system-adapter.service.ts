import { Injectable } from '@angular/core';
import { GradingSystemClient } from 'src/app/models/core/client/grading.system.client.model';
import { GradingSystemServer } from 'src/app/models/core/server/grading.system.server.model';

@Injectable({
  providedIn: 'root'
})
export class GradingSystemAdapterService {

  constructor() { }

  public adaptServerToClient(serverObj: GradingSystemServer): GradingSystemClient {
      return new GradingSystemClient(
          serverObj.id, 
          serverObj.name, 
          serverObj.description, 
          serverObj.minimumScore,
          serverObj.maximiumScore,
          serverObj.passingGrade,
          serverObj.status
      );
  }

  public adaptClientToServer(clientObj: GradingSystemClient): GradingSystemServer {
      return new GradingSystemServer(
          clientObj.id, 
          clientObj.name, 
          clientObj.description, 
          clientObj.minimumScore,
          clientObj.maximiumScore,
          clientObj.passingGrade,
          clientObj.status
      );
  }
}
