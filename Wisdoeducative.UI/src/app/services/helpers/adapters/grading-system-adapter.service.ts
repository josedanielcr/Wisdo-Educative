import { Injectable } from '@angular/core';
import { GrandingSystemClient } from 'src/app/models/core/client/grading.system.client.model';
import { GrandingSystemServer } from 'src/app/models/core/server/grading.system.server.model';

@Injectable({
  providedIn: 'root'
})
export class GradingSystemAdapterService {

  constructor() { }

  public adaptServerToClient(serverObj: GrandingSystemServer): GrandingSystemClient {
      return new GrandingSystemClient(
          serverObj.id, 
          serverObj.name, 
          serverObj.description, 
          serverObj.minimumScore,
          serverObj.maximiumScore,
          serverObj.passingGrade,
          serverObj.status
      );
  }

  public adaptClientToServer(clientObj: GrandingSystemClient): GrandingSystemServer {
      return new GrandingSystemServer(
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
