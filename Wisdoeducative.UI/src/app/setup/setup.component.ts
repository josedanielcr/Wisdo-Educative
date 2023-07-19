import { Component, OnInit } from '@angular/core';
import { ButtonType } from '../enums/button.enum';
import { Router } from '@angular/router';
import { AuthService } from '../services/core/auth.service';
import { UserClient } from '../models/core/client/user.client.model';
import { UserStatus } from '../enums/core/user.status.enum';
import { WindowResizeService } from '../services/helpers/window-resize.service';
import { ScreenSizeModel } from '../models/screenSize.model';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  public ButtonType = ButtonType;
  public isStartupWindowOpen: boolean = true;
  public isPhone: boolean = false;
  public isTablet: boolean = false;
  public isDesktop: boolean = false;

  constructor(private router: Router,
    private authService: AuthService,
    private resizeService: WindowResizeService) {
  }

  ngOnInit(): void {
    this.manageWindowSize();
    this.authService.getUserSubject().subscribe({
      next: (user: UserClient) => {
        if (user.userStatus !== UserStatus.Pending) {
          this.router.navigate(['/workspace']);
        }
      }
    })
  }
  private manageWindowSize() {
    this.resizeService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  public skipSetup(): void {
    this.router.navigate(['workspace']);
  }

  public startSetup(): void {
    this.isStartupWindowOpen = false;
  }
}