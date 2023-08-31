import { Component, OnDestroy } from '@angular/core';
import { ApplicationErrorModel } from '../models/application.error.model';
import { UserClient } from '../models/core/client/user.client.model';
import { Router } from '@angular/router';
import { MenuService } from '../services/components/menu.service';
import { WindowResizeService } from '../services/helpers/window-resize.service';
import { ScreenSizeModel } from '../models/screenSize.model';
import { StoreService } from '../services/core/store.service';
import { UserService } from '../services/core/models/user.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {

  public isSidebarContracted : boolean;
  public isDesktop : boolean;
  public isTablet : boolean;
  public isPhone : boolean;

  constructor(private storeService : StoreService,
    private router : Router,
    private menuService : MenuService,
    private windowService : WindowResizeService,
    private userService : UserService) { }

  ngOnInit() {
    this.manageUserState();
    this.subscribeToSidebarService();
    this.subscribeToWindowService();
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  private subscribeToSidebarService(): void {
    this.menuService.getContractedSidebar().subscribe((isContracted : boolean) => {
      this.isSidebarContracted = isContracted;
    });
  }

  private manageUserState() : void {
    this.storeService.select('user').subscribe({
      complete : () => {
        this.userService.validateUser().subscribe({
          next: (user: UserClient) => {
            this.storeService.set('user', user);
            if(user.userStatus === 'Pending') this.router.navigate(['/setup']);
          }
        });
      }
    });
  }
}