import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationErrorService } from '../helpers/application-error.service';
import { ApiUrlService } from '../helpers/api-url.service';
import { Observable, catchError, map } from 'rxjs';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanServer } from 'src/app/models/core/server/study.plan.server.model';
import { StudyPlanAdapterService } from '../helpers/adapters/study-plan-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanService {

  constructor(private http : HttpClient,
    private applicationErrorService : ApplicationErrorService,
    private apiUrlService : ApiUrlService,
    private studyPlanAdapterService : StudyPlanAdapterService) { }

  public getUserStudyPlan(userDegreeId : number): Observable<StudyPlanClient> {
    return this.http.get<StudyPlanClient>(`${this.apiUrlService.checkEnvironment()}/studyPlan/${userDegreeId}`)
      .pipe(
        map((studyPlan: StudyPlanServer) => {
          return this.studyPlanAdapterService.adaptServerToClient(studyPlan);
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }
}