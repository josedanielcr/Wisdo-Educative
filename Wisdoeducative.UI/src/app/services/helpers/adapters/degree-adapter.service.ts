import { Injectable } from '@angular/core';
import { DegreeClient } from 'src/app/models/core/client/degree.client.model';
import { DegreeServer } from 'src/app/models/core/server/degree.server.model';

@Injectable({
  providedIn: 'root'
})
export class DegreeAdapterService {

  constructor() { }

  public adaptDegreeClientToServer(degreeDto: DegreeClient): DegreeServer {
      const serverObj = new DegreeServer();
      serverObj.id = degreeDto.id;
      serverObj.name = degreeDto.name;
      serverObj.studyField = degreeDto.studyField;
      serverObj.type = degreeDto.type;
      serverObj.status = degreeDto.status;
      return serverObj;
  }

  public adaptDegreeServerToClient(degreeServer: DegreeServer): DegreeClient {
      const clientObj = new DegreeClient();
      clientObj.id = degreeServer.id;
      clientObj.name = degreeServer.name;
      clientObj.studyField = degreeServer.studyField;
      clientObj.type = degreeServer.type;
      clientObj.status = degreeServer.status;
      return clientObj;
  }
}
