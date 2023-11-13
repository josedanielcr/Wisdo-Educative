import { Injectable } from '@angular/core';
import { RoleClient } from 'src/app/models/core/client/role.client.model';
import { RoleServer } from 'src/app/models/core/server/role.server.model';

@Injectable({
  providedIn: 'root'
})
export class RoleAdapterService {

  constructor() { }

  public adaptRoleServerToClient(serverObj: RoleServer): RoleClient {
      const clientObj = new RoleClient();
      clientObj.id = serverObj.id;
      clientObj.name = serverObj.name;
      clientObj.description = serverObj.description;
      clientObj.status = serverObj.status;
      return clientObj;
  }

  public adaptRoleClientToServer(clientObj: RoleClient): RoleServer {
      const serverObj = new RoleServer();
      serverObj.id = clientObj.id;
      serverObj.name = clientObj.name;
      serverObj.description = clientObj.description;
      serverObj.status = clientObj.status;
      return serverObj;
  }
}
