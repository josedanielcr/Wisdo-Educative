import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, switchMap, tap } from 'rxjs';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserService } from './user.service';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { ApplicationErrorService } from '../helpers/application-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject : BehaviorSubject<UserClient> = new BehaviorSubject<UserClient>(null);

  constructor(private userService : UserService,
     private applicationErrorService : ApplicationErrorService) { }

  public getUserSubject() : Observable<UserClient> {
    if(this.userSubject.value === null){
      return this.userService.validateUser().pipe(
        tap((user: UserClient) => {
          this.setUserSubject(user);
        }),
        catchError((err: any) => {
          this.setUserSubject(null);
          throw this.applicationErrorService.parseHttpError(err);
        }),
        switchMap(() => this.userSubject.asObservable())
      );
    } else {
      return this.userSubject.asObservable();
    }
  }

  public setUserSubject(user : UserClient) : void {
    this.userSubject.next(user);
  }
}