import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ButtonType } from '../enums/button.enum';
import { Router } from '@angular/router';
import { UserClient } from '../models/core/client/user.client.model';
import { UserStatus } from '../enums/core/user.status.enum';
import { WindowResizeService } from '../services/helpers/window-resize.service';
import { ScreenSizeModel } from '../models/screenSize.model';
import { UserService } from '../services/core/models/user.service';
import { StoreService } from '../services/core/store.service';
import { MessageService } from '../services/core/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit, AfterViewInit, OnDestroy {

  public ButtonType = ButtonType;
  public isStartupWindowOpen: boolean = true;
  public isPhone: boolean = false;
  public isTablet: boolean = false;
  public isDesktop: boolean = false;
  public user : UserClient;
  @ViewChild('messageContainer', { read: ViewContainerRef }) messageContainer: ViewContainerRef;

  //subscriptions
  private subscriptions : Subscription[] = [];

  constructor(private router: Router,
    private storeService : StoreService,
    private resizeService: WindowResizeService,
    private userService : UserService,
    private messageService : MessageService,
    private cdr : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.manangeUserState();
    this.manageWindowSize();
  }

  ngAfterViewInit(): void {
    this.messageService.setContainer(this.messageContainer);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private manangeUserState(): void {
    this.subscriptions.push(this.storeService.select('user').subscribe({
      next: (user: UserClient) => {
        if (user.userStatus !== UserStatus.Pending && user.userStatus !== UserStatus.Omitted) {
          this.router.navigate(['/workspace']);
        }
        this.user = user;
      },
      complete : () => {
        this.userService.validateUser().subscribe({
          next: (user: UserClient) => {
            this.storeService.set('user', user);
            if (user.userStatus !== UserStatus.Pending && user.userStatus !== UserStatus.Omitted) {
              this.router.navigate(['/workspace']);
            }
            this.user = user;
          }
        });
      }
    }));
  }

  private manageWindowSize() {
    this.subscriptions.push(this.resizeService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    }));
  }

  public skipSetup(): void {
    if(this.user.userStatus === UserStatus.Omitted) {
      this.router.navigate(['workspace']);
      return;
    }

    this.subscriptions.push(this.userService.omitUserSetup(this.user.id).subscribe({
      next: () => {
        this.router.navigate(['workspace']);
      },
      error: (error: any) => {
        console.log(error);
      }
    }));
  }

  public startSetup(): void {
    this.isStartupWindowOpen = false;
  }
}