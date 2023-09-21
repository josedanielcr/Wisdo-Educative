import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { MenuService } from 'src/app/services/components/menu.service';
import { UserService } from 'src/app/services/core/models/user.service';
import { StoreService } from 'src/app/services/core/store.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user : UserClient;
  public isDesktop : boolean = false;
  public isTablet : boolean = false;
  public isPhone : boolean = false;
  public isDropdownOpen : boolean;
  public isSidebarOpen : boolean;

  constructor(private windowResizeService: WindowResizeService,
              private menuService : MenuService,
              private storeService : StoreService,
              private userService : UserService,
              private msalService: MsalService) {}

  ngOnInit(): void {
    this.manageWindowSizes();
    this.setUser();
    this.setDropdownState();
    this.setSidebarState();
  }

  private setSidebarState(): void {
    this.menuService.getSidebarHidden().subscribe((isSidebarOpen : boolean) => {
      this.isSidebarOpen = isSidebarOpen;
    });;
  }

  private setDropdownState() {
    this.menuService.getDropdownMenuOpen().subscribe((isDropdownOpen: boolean) => {
      this.isDropdownOpen = isDropdownOpen;
    });
  }

  private setUser() {
    this.storeService.select('user').subscribe({
      next: (user: UserClient) => {
        this.user = user;
      },
      complete : () => {
        this.userService.validateUser().subscribe({
          next: (user: UserClient) => {
            this.storeService.set('user', user);
            this.user = user;
          }
        });
      }
    });
  }
  /**
   * Initiates the logout flow using the MSAL service.
   * The postLogoutRedirectUri parameter is set to the app's /auth route.
 */
  public logout() { 
    let redirectUri : string;
    if(window.location.href.indexOf('localhost') > -1) {
        redirectUri = 'http://localhost:4200/landing';
    } else {
      redirectUri = 'https://lemon-glacier-05e76cc10.3.azurestaticapps.net/landing'
    }
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: redirectUri
    });
  }
  

  private manageWindowSizes(): void {
    this.windowResizeService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  public toggleDropdownMenu(): void {
    this.menuService.setDropdownMenuOpen(!this.isDropdownOpen);
  }

  public toggleSidebar(): void {
    this.menuService.setSidebarHidden(!this.isSidebarOpen);
  }
}