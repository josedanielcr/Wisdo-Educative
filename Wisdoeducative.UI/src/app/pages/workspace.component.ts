import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserClient } from '../models/core/client/user.client.model';
import { Router } from '@angular/router';
import { MenuService } from '../services/components/menu.service';
import { WindowResizeService } from '../services/helpers/window-resize.service';
import { ScreenSizeModel } from '../models/screenSize.model';
import { StoreService } from '../services/core/store.service';
import { UserService } from '../services/core/models/user.service';
import { MessageService } from '../services/core/message.service';
import { SpinnerService } from '../services/core/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('messageContainer', { read: ViewContainerRef }) messageContainer: ViewContainerRef;
  @ViewChild('spinnerContainer', { read: ViewContainerRef }) spinnerContainer: ViewContainerRef;

  public isSidebarContracted : boolean;
  public isDesktop : boolean;
  public isTablet : boolean;
  public isPhone : boolean;

  //subcriptions
  private subscriptions : Subscription[] = [];

  constructor(private storeService : StoreService,
    private router : Router,
    private menuService : MenuService,
    private windowService : WindowResizeService,
    private userService : UserService,
    private messageService : MessageService,
    private spinnerService : SpinnerService,
    private cdr : ChangeDetectorRef) { }

  ngOnInit() {
    this.manageUserState();
    this.subscribeToSidebarService();
    this.subscribeToWindowService();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
  
  ngAfterViewInit(): void {
    this.messageService.setContainer(this.messageContainer);
    this.spinnerService.setContainer(this.spinnerContainer);
    this.cdr.detectChanges();
  }

  private subscribeToWindowService() {
    this.subscriptions.push(this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    }));
  }

  private subscribeToSidebarService(): void {
    this.subscriptions.push(this.menuService.getContractedSidebar().subscribe((isContracted : boolean) => {
      this.isSidebarContracted = isContracted;
    }));
  }

  private manageUserState() : void {
    this.subscriptions.push(this.storeService.select('user').subscribe({
      complete : () => {
        this.subscriptions.push(this.userService.validateUser().subscribe({
          next: (user: UserClient) => {
            this.storeService.set('user', user);
            if(user.userStatus === 'Pending') this.router.navigate(['/setup']);
          }
        }));
      }
    }));
  }
}