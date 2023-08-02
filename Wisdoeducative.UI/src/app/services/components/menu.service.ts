import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../helpers/api-url.service';
import { BehaviorSubject, Observable, Subject, catchError, map } from 'rxjs';
import { MenuOptionClient } from 'src/app/models/core/client/menu.option.client.model';
import { MenuOptionServer } from 'src/app/models/core/server/menu.option.server.model';
import { MenuOptionAdapterService } from '../helpers/adapters/menu-option-adapter.service';
import { ApplicationErrorService } from '../helpers/application-error.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private sidebarContractedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private dropdownMenuSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sidebarHiddenSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http : HttpClient,
    private apiUrlService : ApiUrlService,
    private menuOptionsAdapter : MenuOptionAdapterService,
    private applicationErrorService : ApplicationErrorService) {}


  public setContractedSidebar(isContracted : boolean): void {
    this.sidebarContractedSubject.next(isContracted);
  }

  public getContractedSidebar() : Observable<boolean> {
    return this.sidebarContractedSubject.asObservable();
  }

  public setDropdownMenuOpen(isOpen : boolean): void {
    this.dropdownMenuSubject.next(isOpen);
  }

  public getDropdownMenuOpen() : Observable<boolean> {
    return this.dropdownMenuSubject.asObservable();
  }

  public setSidebarHidden(isHidden : boolean): void {
    this.sidebarHiddenSubject.next(isHidden);
  }

  public getSidebarHidden() : Observable<boolean> {
    return this.sidebarHiddenSubject.asObservable();
  }

  public getMenuOptions(userId : number): Observable<MenuOptionClient[]> {
    return this.http.get(`${this.apiUrlService.checkEnvironment()}/menu/${userId}`)
      .pipe(
        map((menuOptionsServer : MenuOptionServer[]) => {
          return menuOptionsServer.map((menuOption : MenuOptionServer) => {
            return this.menuOptionsAdapter.adaptServerMenuOptionToClient(menuOption);
          });
        }),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
    );
  }

}
