import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  private readonly _destroying$ = new Subject<void>();
  public loginDisplay = false;

  // Inject the MSAL guard configuration and the MSAL services
  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, 
              private broadcastService: MsalBroadcastService, 
              private msalService: MsalService,
              private router : Router) { 
  }

  // Subscribe to the MSAL broadcast service to check if there is any interaction in progress
  ngOnInit() {
    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })
  }

  /**
   * Initiates the login flow using the MSAL service.
   * If the MSAL guard configuration contains an auth request object, it is passed to the loginRedirect method.
   * Otherwise, the loginRedirect method is called without any parameters.
   */
  login() {
    if (this.msalGuardConfig.authRequest){
      this.msalService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.msalService.loginRedirect();
    }
  }

  /**
   * Initiates the logout flow using the MSAL service.
   * The postLogoutRedirectUri parameter is set to the app's /auth route.
   */
  logout() { 
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200/auth'
    });
  }

  /**
   * Updates the loginDisplay property based on whether a user is logged in or not.
   * If the getAllAccounts method returns an array of accounts with length > 0, loginDisplay is set to true.
   * Otherwise, loginDisplay is set to false.
   */
  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
    // if(this.loginDisplay){
    //   this.router.navigate(['/workspace']);
    // }
  }

  // Unsubscribe from the MSAL broadcast service when the component is destroyed
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}