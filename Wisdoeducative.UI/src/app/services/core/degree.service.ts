import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { UserDegreeAdapterService } from '../helpers/adapters/user-degree-adapter.service';
import { ApplicationErrorService } from '../helpers/application-error.service';
import { ApiUrlService } from '../helpers/api-url.service';
import { UserDegreeServer } from 'src/app/models/core/server/user.degree.server.model';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  constructor(private http : HttpClient,
    private apiUrlService : ApiUrlService,
    private userDegreeAdapater : UserDegreeAdapterService,
    private applicationErrorService : ApplicationErrorService) { }

  
  public getUserDegrees(userId : number) : Observable<UserDegreeClient[]> {
    return this.http.get(`${this.apiUrlService.checkEnvironment()}/degree/user/${userId}`)
    .pipe(
      map((userDegrees : UserDegreeServer[]) => {
        return userDegrees.map((userDegree : UserDegreeServer) => {
          return this.userDegreeAdapater.adaptUserDegreeServerToClient(userDegree);
        });
      }),
      catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
    );
  }
}