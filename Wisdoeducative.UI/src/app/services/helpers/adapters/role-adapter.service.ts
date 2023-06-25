import { Injectable } from '@angular/core';
import { RoleClient } from 'src/app/models/core/client/role.client.model';
import { RoleServer } from 'src/app/models/core/server/role.server.model';

@Injectable({
  providedIn: 'root'
})
export class RoleAdapterService {

  constructor() { }

  public adaptRoleServerToClient(roleServer: RoleServer): RoleClient {
    return new RoleClient(roleServer.id, roleServer.name, 
      roleServer.description, 
      roleServer.status);
  }

  public adaptRoleClientToServer(roleClient: RoleClient): RoleServer {
    return new RoleServer(roleClient.id, roleClient.name,
       roleClient.description, 
       roleClient.status);
  }
}
