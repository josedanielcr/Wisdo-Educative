import { Injectable } from '@angular/core';
import { MenuOptionClient } from 'src/app/models/core/client/menu.option.client.model';
import { MenuOptionServer } from 'src/app/models/core/server/menu.option.server.model';

@Injectable({
  providedIn: 'root'
})
export class MenuOptionAdapterService {

  constructor() { }

  public adaptServerMenuOptionToClient(serverObj: MenuOptionServer): MenuOptionClient {
      const clientObj = new MenuOptionClient();
      clientObj.id = serverObj.id;
      clientObj.name = serverObj.name;
      clientObj.description = serverObj.description;
      clientObj.isParent = serverObj.isParent;
      clientObj.icon = serverObj.icon;
      clientObj.path = serverObj.path;
      clientObj.status = serverObj.status;
      return clientObj;
  }

  public adaptClientMenuOptionToServer(clientObj: MenuOptionClient): MenuOptionServer {
      const serverObj = new MenuOptionServer();
      serverObj.id = clientObj.id;
      serverObj.name = clientObj.name;
      serverObj.description = clientObj.description;
      serverObj.isParent = clientObj.isParent;
      serverObj.icon = clientObj.icon;
      serverObj.path = clientObj.path;
      serverObj.status = clientObj.status;
      return serverObj;
  }
}
