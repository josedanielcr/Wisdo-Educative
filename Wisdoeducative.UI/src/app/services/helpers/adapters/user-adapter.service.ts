import { Injectable } from '@angular/core';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserServer } from 'src/app/models/core/server/user.server.model';
import { RoleAdapterService } from './role-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdapterService {

  constructor(private roleAdapterService: RoleAdapterService) { }

  public adaptUserServerToClient(userServer: UserServer): UserClient {
    let clientObj = new UserClient();
    clientObj.role = userServer.role ? this.roleAdapterService.adaptRoleServerToClient(userServer.role) : null;
    clientObj.id = userServer.id;
    clientObj.b2cId = userServer.b2cId;
    clientObj.name = userServer.name;
    clientObj.lastName = userServer.lastName;
    clientObj.dateOfBirth = userServer.dateOfBirth;
    clientObj.email = userServer.email;
    clientObj.profileImage = userServer.profileImage;
    clientObj.userStatus = userServer.userStatus;
    clientObj.roleId = userServer.roleId;
    clientObj.category = userServer.category;
    return clientObj;
  }

  public adaptUserClientToServer(userClient: UserClient): UserServer {
    let serverObj = new UserServer();
    serverObj.role = userClient.role ? this.roleAdapterService.adaptRoleClientToServer(userClient.role) : null;
    serverObj.id = userClient.id;
    serverObj.b2cId = userClient.b2cId;
    serverObj.name = userClient.name;
    serverObj.lastName = userClient.lastName;
    serverObj.dateOfBirth = userClient.dateOfBirth;
    serverObj.email = userClient.email;
    serverObj.profileImage = userClient.profileImage;
    serverObj.userStatus = userClient.userStatus;
    serverObj.roleId = userClient.roleId;
    serverObj.category = userClient.category;
    return serverObj;
  }
}
