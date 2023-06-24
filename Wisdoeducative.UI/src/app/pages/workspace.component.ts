import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {

  constructor(private msalService: MsalService) { }

  // onOninit that checks if the user is logged in
  ngOnInit() {
    console.log(this.msalService.instance.getAllAccounts());
  }
}