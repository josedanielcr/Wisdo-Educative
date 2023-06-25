import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../services/core/auth.service';
import { ApplicationErrorModel } from '../models/application.error.model';
import { UserClient } from '../models/core/client/user.client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {

  constructor(private msalService: MsalService, 
    private authService : AuthService,
    private router : Router) { }

  // onOninit that checks if the user is logged in
  ngOnInit() {
    this.manageUserState();
  }

  private manageUserState() : void {
    console.log(this.msalService.instance.getAllAccounts());
    this.authService.getUserSubject().subscribe({
      next: (user : UserClient) => {
        if(user.userStatus === 'Pending') this.router.navigate(['/setup']);
      },
      error: (err : ApplicationErrorModel) => alert(err.message),
    })
  }
}