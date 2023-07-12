import { Injectable } from '@angular/core';
import { InstitutionClient } from 'src/app/models/core/client/institution.client.model';
import { InstitutionServer } from 'src/app/models/core/server/institution.server.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionAdapterService {

  constructor() { }

  public adaptInstitutionClientToServer(institutionDto: InstitutionClient): InstitutionServer {
    return new InstitutionServer(
      institutionDto.id,
      institutionDto.name,
      institutionDto.country,
      institutionDto.countryCode,
      institutionDto.website,
      institutionDto.status
    );
  }
  
  public adaptInstitutionServerToClient(institutionServer: InstitutionServer): InstitutionClient {
    return new InstitutionClient(
      institutionServer.id,
      institutionServer.name,
      institutionServer.country,
      institutionServer.countryCode,
      institutionServer.website,
      institutionServer.status
    );
  }
}