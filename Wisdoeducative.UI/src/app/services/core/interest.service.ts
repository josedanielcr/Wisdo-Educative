import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { InterestClient } from 'src/app/models/core/client/interest.client.model';
import { InterestServer } from 'src/app/models/core/server/interest.server.model';
import { environment } from 'src/environments/environment.development';
import { InterestAdapterService } from '../helpers/adapters/interest-adapter.service';
import { ApplicationErrorService } from '../helpers/application-error.service';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(private http : HttpClient,
    private interestAdapterService : InterestAdapterService,
    private applicationErrorService : ApplicationErrorService) { }

  public getInterests(): Observable<InterestClient[]> {
    return this.http.get<InterestServer[]>(`${environment.apiUrl}/interest`)
      .pipe(
        map((interests: InterestServer[]) => {
          let interestClient : InterestClient[] = [];
          for(let interest of interests) {
            interestClient.push(this.interestAdapterService.adaptInterestServerToClient(interest));
          }
          return interestClient;
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }
}