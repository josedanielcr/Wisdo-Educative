import { Injectable } from '@angular/core';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserServer } from 'src/app/models/core/server/user.server.model';
import { RoleAdapterService } from './role-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdapterService {

  constructor(private roleAdapterService : RoleAdapterService) { }

  public adaptUserServerToClient(userServer: UserServer): UserClient {
    const roleClient = userServer.role ? this.roleAdapterService
      .adaptRoleServerToClient(userServer.role) : null;
    return new UserClient(
      userServer.id,
      userServer.b2cId,
      userServer.name,
      userServer.lastName,
      userServer.dateOfBirth,
      userServer.email,
      userServer.profileImage,
      userServer.userStatus,
      roleClient,
      userServer.roleId,
      userServer.category
    );
  }

  public adaptUserClientToServer(userClient: UserClient): UserServer {
    const roleServer = userClient.role ? this.roleAdapterService
      .adaptRoleClientToServer(userClient.role) : null;
    return new UserServer(
      userClient.id,
      userClient.b2cId,
      userClient.name,
      userClient.lastName,
      userClient.dateOfBirth,
      userClient.email,
      userClient.profileImage,
      userClient.userStatus,
      roleServer,
      userClient.roleId,
      userClient.category
    );
  }
}