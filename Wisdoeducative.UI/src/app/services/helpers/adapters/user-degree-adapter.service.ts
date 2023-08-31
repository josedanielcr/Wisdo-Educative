import { Injectable } from '@angular/core';
import { DegreeClient } from 'src/app/models/core/client/degree.client.model';
import { InstitutionClient } from 'src/app/models/core/client/institution.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { UserDegreeServer } from 'src/app/models/core/server/user.degree.server.model';
import { UserAdapterService } from './user-adapter.service';
import { DegreeAdapterService } from './degree-adapter.service';
import { InstitutionAdapterService } from './institution-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class UserDegreeAdapterService {

  constructor(private userAdapterService: UserAdapterService,
              private degreeAdapterService: DegreeAdapterService,
              private institutionAdapterService: InstitutionAdapterService) { }

  public adaptUserDegreeClientToServer(userDegreeDto: UserDegreeClient): UserDegreeServer {
    let serverObj = new UserDegreeServer();
    serverObj.degree = userDegreeDto.degree ? this.degreeAdapterService.adaptDegreeClientToServer(userDegreeDto.degree) : null;
    serverObj.user = userDegreeDto.user ? this.userAdapterService.adaptUserClientToServer(userDegreeDto.user) : null;
    serverObj.institution = userDegreeDto.institution ? this.institutionAdapterService.adaptInstitutionClientToServer(userDegreeDto.institution) : null;
    serverObj.id = userDegreeDto.id;
    serverObj.degreeId = userDegreeDto.degreeId;
    serverObj.userId = userDegreeDto.userId;
    serverObj.institutionId = userDegreeDto.institutionId;
    serverObj.currentProgress = userDegreeDto.currentProgress;
    serverObj.startDate = userDegreeDto.startDate;
    serverObj.endDate = userDegreeDto.endDate;
    serverObj.schedule = userDegreeDto.schedule;
    serverObj.status = userDegreeDto.status;
    return serverObj;
  }
  
  public adaptUserDegreeServerToClient(userDegreeServer: UserDegreeServer): UserDegreeClient {
    let clientObj = new UserDegreeClient();
    clientObj.degree = userDegreeServer.degree ? this.degreeAdapterService.adaptDegreeServerToClient(userDegreeServer.degree) : null;
    clientObj.user = userDegreeServer.user ? this.userAdapterService.adaptUserServerToClient(userDegreeServer.user) : null;
    clientObj.institution = userDegreeServer.institution ? this.institutionAdapterService.adaptInstitutionServerToClient(userDegreeServer.institution) : null;
    clientObj.id = userDegreeServer.id;
    clientObj.degreeId = userDegreeServer.degreeId;
    clientObj.userId = userDegreeServer.userId;
    clientObj.institutionId = userDegreeServer.institutionId;
    clientObj.currentProgress = userDegreeServer.currentProgress;
    clientObj.startDate = userDegreeServer.startDate;
    clientObj.endDate = userDegreeServer.endDate;
    clientObj.schedule = userDegreeServer.schedule;
    clientObj.status = userDegreeServer.status;
    return clientObj;
  }
}
