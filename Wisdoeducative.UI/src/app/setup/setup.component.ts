import { Component, OnInit } from '@angular/core';
import { ButtonType } from '../enums/button.enum';
import { Router } from '@angular/router';
import { AuthService } from '../services/core/auth.service';
import { UserClient } from '../models/core/client/user.client.model';
import { UserStatus } from '../enums/core/user.status.enum';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

    public ButtonType = ButtonType;
    public isStartupWindowOpen: boolean = true;

    constructor(private router : Router,
                private authService : AuthService){}

    ngOnInit(): void {
        this.authService.getUserSubject().subscribe({
            next: (user : UserClient) => {
                if(user.userStatus !== UserStatus.PendingData
                    && user.userStatus !== UserStatus.PendingDegree
                    && user.userStatus !== UserStatus.PendingInterests) {
                        this.router.navigate(['/workspace']);        
                }
            }
        })
    }

    public skipSetup(): void {
        this.router.navigate(['workspace']);
    }

    public startSetup(): void {
        this.isStartupWindowOpen = false;
    }
}