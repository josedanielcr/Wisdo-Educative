import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { ExampleService } from '../services/example.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {

  constructor(private msalService: MsalService,
              private exampleService : ExampleService) { }

  // onOninit that checks if the user is logged in
  ngOnInit() {
    console.log(this.msalService.instance.getAllAccounts());
  }

  public getNotSecured(){
    this.exampleService.getExample().subscribe((data) => {
      console.log(data);
    });
  }
}