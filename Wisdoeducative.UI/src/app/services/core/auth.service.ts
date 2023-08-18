import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserService } from './user.service';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { ApplicationErrorService } from '../helpers/application-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject : Subject<UserClient> = new Subject<UserClient>();
  private currentUser: UserClient | null = null;

  constructor(private userService : UserService,
     private applicationErrorService : ApplicationErrorService) {}

    public setUser(): void {
    this.userService.validateUser().subscribe({
      next: (user: UserClient) => {
        this.currentUser = user;
        this.setUserSubject(user);
      },
      error: (error: ApplicationErrorModel) => {
        this.applicationErrorService.parseHttpError(error);
      }
    });
  }

  public setUserSubject(user: UserClient): void {
    this.userSubject.next(user);
  }
  
  public getUserSubject(): Observable<UserClient> {
    return this.userSubject.asObservable();
  }
  
  public getCurrentUser(): UserClient | null {
    return this.currentUser;
  }
}