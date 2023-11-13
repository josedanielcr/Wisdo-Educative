import { Injectable } from '@angular/core';
import { InstitutionClient } from 'src/app/models/core/client/institution.client.model';
import { InstitutionServer } from 'src/app/models/core/server/institution.server.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionAdapterService {

  constructor() { }

  public adaptInstitutionClientToServer(institutionDto: InstitutionClient): InstitutionServer {
      const serverObj = new InstitutionServer();
      serverObj.id = institutionDto.id;
      serverObj.name = institutionDto.name;
      serverObj.country = institutionDto.country;
      serverObj.countryCode = institutionDto.countryCode;
      serverObj.website = institutionDto.website;
      serverObj.status = institutionDto.status;
      return serverObj;
  }

  public adaptInstitutionServerToClient(institutionServer: InstitutionServer): InstitutionClient {
      const clientObj = new InstitutionClient();
      clientObj.id = institutionServer.id;
      clientObj.name = institutionServer.name;
      clientObj.country = institutionServer.country;
      clientObj.countryCode = institutionServer.countryCode;
      clientObj.website = institutionServer.website;
      clientObj.status = institutionServer.status;
      return clientObj;
  }
}
