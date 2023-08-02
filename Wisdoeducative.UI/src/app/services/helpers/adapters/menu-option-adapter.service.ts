import { Injectable } from '@angular/core';
import { MenuOptionClient } from 'src/app/models/core/client/menu.option.client.model';
import { MenuOptionServer } from 'src/app/models/core/server/menu.option.server.model';

@Injectable({
  providedIn: 'root'
})
export class MenuOptionAdapterService {

  constructor() { }

  public adaptServerMenuOptionToClient(MenuOption : MenuOptionServer): MenuOptionClient {
    return new MenuOptionClient(
      MenuOption.id, 
      MenuOption.name,
      MenuOption.description,
      MenuOption.isParent,
      MenuOption.icon,
      MenuOption.path,
      MenuOption.status
      );
  }

  public adaptClientMenuOptionToServer(MenuOption : MenuOptionClient): MenuOptionServer {
    return new MenuOptionServer(
      MenuOption.id, 
      MenuOption.name,
      MenuOption.description,
      MenuOption.isParent,
      MenuOption.icon,
      MenuOption.path,
      MenuOption.status
      );
  }
}