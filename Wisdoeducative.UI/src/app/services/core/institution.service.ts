import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { InstitutionClient } from 'src/app/models/core/client/institution.client.model';
import { InstitutionServer } from 'src/app/models/core/server/institution.server.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  applicationErrorService: any;

  constructor(private http : HttpClient) { }

  public getInstitutions(): Observable<InstitutionClient[]> {
    return this.http.get(`${environment.apiUrl}/institutions`)
      .pipe(
        map((institutions : InstitutionServer[]) => {
          return institutions.map((institution : InstitutionServer) => {
            return new InstitutionClient(institution.id, 
              institution.name,institution.country,
               institution.countryCode, institution.website, institution.status);
          });
        }),
        catchError((error: any) => {throw this.applicationErrorService.parseHttpError(error)})
      );
  }
}