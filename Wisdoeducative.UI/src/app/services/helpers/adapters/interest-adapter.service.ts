import { Injectable } from '@angular/core';
import { InterestClient } from 'src/app/models/core/client/interest.client.model';
import { InterestServer } from 'src/app/models/core/server/interest.server.model';

@Injectable({
  providedIn: 'root'
})
export class InterestAdapterService {

  constructor() { }

  public adaptInterestClientToServer(interestClient: InterestClient): InterestServer {
    return new InterestServer(interestClient.id, interestClient.name, interestClient.status);
  }
  
  public adaptInterestServerToClient(interestServer: InterestServer): InterestClient {
    return new InterestClient(interestServer.id, interestServer.name, interestServer.status);
  }
}