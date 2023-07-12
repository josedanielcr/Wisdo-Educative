import { Injectable } from '@angular/core';
import { DegreeClient } from 'src/app/models/core/client/degree.client.model';
import { DegreeServer } from 'src/app/models/core/server/degree.server.model';

@Injectable({
  providedIn: 'root'
})
export class DegreeAdapterService {

  constructor() { }

  public adaptDegreeClientToServer(degreeDto: DegreeClient): DegreeServer {
    return new DegreeServer(
      degreeDto.id,
      degreeDto.name,
      degreeDto.studyField,
      degreeDto.type,
      degreeDto.status
    );
  }

  public adaptDegreeServerToClient(degreeServer: DegreeServer): DegreeClient {
    return new DegreeClient(
      degreeServer.id,
      degreeServer.name,
      degreeServer.studyField,
      degreeServer.type,
      degreeServer.status
    );
  }
}