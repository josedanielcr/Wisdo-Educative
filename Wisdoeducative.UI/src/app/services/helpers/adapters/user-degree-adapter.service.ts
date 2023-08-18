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

  constructor(private userAdapterService : UserAdapterService,
              private degreeAdapterService : DegreeAdapterService,
              private institutionAdapterService : InstitutionAdapterService) { }

  public adaptUserDegreeClientToServer(userDegreeDto: UserDegreeClient): UserDegreeServer {
    const degreeServer = userDegreeDto.degree ?
     this.degreeAdapterService.adaptDegreeClientToServer(userDegreeDto.degree) : null;
    const userServer = userDegreeDto.user ? 
      this.userAdapterService.adaptUserClientToServer(userDegreeDto.user) : null;
    const institutionServer = userDegreeDto.institution ?
     this.institutionAdapterService.adaptInstitutionClientToServer(userDegreeDto.institution) : null;
  
    return new UserDegreeServer(
      userDegreeDto.id,
      degreeServer,
      userDegreeDto.degreeId,
      userServer,
      userDegreeDto.userId,
      institutionServer,
      userDegreeDto.institutionId,
      userDegreeDto.currentProgress,
      userDegreeDto.startDate,
      userDegreeDto.endDate,
      userDegreeDto.schedule,
      userDegreeDto.status
    );
  }
  
  public adaptUserDegreeServerToClient(userDegreeServer: UserDegreeServer): UserDegreeClient {
    const degreeDto = userDegreeServer.degree ?
      this.degreeAdapterService.adaptDegreeServerToClient(userDegreeServer.degree) : null;
    const userDto = userDegreeServer.user ? 
      this.userAdapterService.adaptUserServerToClient(userDegreeServer.user) : null;
    const institutionDto = userDegreeServer.institution ?
      this.institutionAdapterService.adaptInstitutionServerToClient(userDegreeServer.institution) : null;
  
    return new UserDegreeClient(
      userDegreeServer.id,
      degreeDto,
      userDegreeServer.degreeId,
      userDto,
      userDegreeServer.userId,
      institutionDto,
      userDegreeServer.institutionId,
      userDegreeServer.currentProgress,
      userDegreeServer.startDate,
      userDegreeServer.endDate,
      userDegreeServer.schedule,
      userDegreeServer.status
    );
  }
}