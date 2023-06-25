import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ApplicationErrorService } from '../helpers/application-error.service';
import { UserServer } from 'src/app/models/core/server/user.server.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserAdapterService } from '../helpers/adapters/user-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, 
    private applicationErrorService : ApplicationErrorService,
    private userAdapterService : UserAdapterService) { }

  public validateUser(): Observable<UserClient> {
    return this.http.post(`${environment.apiUrl}/user/validate`,{})
      .pipe(
        map((user : UserServer) => this.userAdapterService.adaptUserServerToClient(user)),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
      );
  }

}
