import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuOptionClient } from 'src/app/models/core/client/menu.option.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { MenuService } from 'src/app/services/components/menu.service';
import { AuthService } from 'src/app/services/core/auth.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private user : UserClient;
  public menuOptions : MenuOptionClient[] = [];
  public isDesktop : boolean = false;
  public isTablet : boolean = false;
  public isPhone : boolean = false;
  public isContracted : boolean;
  public isHidden : boolean;

  constructor(private menuService : MenuService,
    private authService : AuthService,
    private windowService : WindowResizeService){}

  ngOnInit(): void {
    this.manageWindowSizes();
    this.setUser();
    this.setSidebarState();
    this.setSidebarHiddenState();
  }

  private setSidebarHiddenState(): void  {
    if(this.isPhone) {
      this.menuService.setSidebarHidden(true);
    }
    this.menuService.getSidebarHidden().subscribe((isHidden : boolean) => {
      this.isHidden = isHidden;
    });
  }

  private setSidebarState(): void {
    this.menuService.getContractedSidebar().subscribe((isContracted : boolean) => {
      this.isContracted = isContracted;
    });
  }

  private manageWindowSizes(): void {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
      if(this.isPhone) this.menuService.setContractedSidebar(false);
      if(this.isDesktop || this.isTablet) this.menuService.setSidebarHidden(false);
    });
  }

  private setUser(): void {
    this.authService.getUserSubject().subscribe((user : UserClient) => {
      this.user = user;
      this.getMenuOptions();
    });
  }

  private getMenuOptions(): void {
    this.menuService.getMenuOptions(this.user.id).subscribe({
      next: (menuOptions : MenuOptionClient[]) => {
        this.menuOptions = menuOptions;
        console.log(this.menuOptions);
      },
      error: (error : any) => {
        console.log(error);
      }
    });
  }

  public contractSidebar(): void {
    this.isContracted = !this.isContracted;
    this.menuService.setContractedSidebar(this.isContracted);
  }

  public hideSidebar(): void {
    this.menuService.setSidebarHidden(!this.isHidden);
  }
}