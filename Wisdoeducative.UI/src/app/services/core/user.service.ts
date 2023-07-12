import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ApplicationErrorService } from '../helpers/application-error.service';
import { UserServer } from 'src/app/models/core/server/user.server.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserAdapterService } from '../helpers/adapters/user-adapter.service';
import { AuthService } from './auth.service';
import { InterestClient } from 'src/app/models/core/client/interest.client.model';
import { InterestAdapterService } from '../helpers/adapters/interest-adapter.service';
import { InterestServer } from 'src/app/models/core/server/interest.server.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, 
    private applicationErrorService : ApplicationErrorService,
    private userAdapterService : UserAdapterService,
    private interestAdapterService : InterestAdapterService) { }

  public validateUser(): Observable<UserClient> {
    return this.http.post(`${environment.apiUrl}/user/validate`,{})
      .pipe(
        map((user : UserServer) => this.userAdapterService.adaptUserServerToClient(user)),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
      );
  }

  public setUserDetails(user : UserClient): Observable<UserClient> {
    return this.http.post(`${environment.apiUrl}/user/configuration`, 
      this.userAdapterService.adaptUserClientToServer(user))
      .pipe(
        map((user : UserServer) => this.userAdapterService.adaptUserServerToClient(user)),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
      );
  }

  public setUserInterests(userId : number, interests : InterestClient[]): Observable<UserClient> {
    let interestsServer : InterestServer[] = interests.map((interest : InterestClient) => 
      this.interestAdapterService.adaptInterestClientToServer(interest));

    return this.http.post(`${environment.apiUrl}/user/${userId}/interests`,interestsServer)
      .pipe(
        map((user : UserServer) => this.userAdapterService.adaptUserServerToClient(user)),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
      );
  }
}