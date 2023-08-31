import { Injectable } from '@angular/core';
import { InterestClient } from 'src/app/models/core/client/interest.client.model';
import { InterestServer } from 'src/app/models/core/server/interest.server.model';

@Injectable({
  providedIn: 'root'
})
export class InterestAdapterService {

  constructor() { }

  public adaptInterestClientToServer(interestClient: InterestClient): InterestServer {
      const serverObj = new InterestServer();
      serverObj.id = interestClient.id;
      serverObj.name = interestClient.name;
      serverObj.status = interestClient.status;
      return serverObj;
  }

  public adaptInterestServerToClient(interestServer: InterestServer): InterestClient {
      const clientObj = new InterestClient();
      clientObj.id = interestServer.id;
      clientObj.name = interestServer.name;
      clientObj.status = interestServer.status;
      return clientObj;
  }
}
