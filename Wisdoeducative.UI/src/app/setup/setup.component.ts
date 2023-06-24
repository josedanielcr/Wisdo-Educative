import { Component } from '@angular/core';
import { ButtonType } from '../enums/button.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {

    public ButtonType = ButtonType;
    public isStartupWindowOpen: boolean = true;

    constructor(private router : Router){}

    public skipSetup(): void {
        this.router.navigate(['workspace']);
    }

    public startSetup(): void {
        this.isStartupWindowOpen = false;
    }
}