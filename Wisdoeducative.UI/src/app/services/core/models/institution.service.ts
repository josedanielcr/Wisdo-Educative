import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { InstitutionClient } from 'src/app/models/core/client/institution.client.model';
import { InstitutionServer } from 'src/app/models/core/server/institution.server.model';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { ApiUrlService } from '../../helpers/api-url.service';
import { InstitutionAdapterService } from '../../helpers/adapters/institution-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http : HttpClient,
    private applicationErrorService : ApplicationErrorService,
    private apiUrlService : ApiUrlService,
    private institutionAdapterService : InstitutionAdapterService) {}

  public getInstitutions(): Observable<InstitutionClient[]> {
    return this.http.get(`${this.apiUrlService.checkEnvironment()}/institutions`)
      .pipe(
        map((institutions : InstitutionServer[]) => {
          return institutions.map((institution : InstitutionServer) => {
            return this.institutionAdapterService.adaptInstitutionServerToClient(institution);
          });
        }),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
      );
  }
}