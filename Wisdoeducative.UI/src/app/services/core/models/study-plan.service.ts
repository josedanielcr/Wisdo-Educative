import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { ApiUrlService } from '../../helpers/api-url.service';
import { Observable, catchError, map } from 'rxjs';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanServer } from 'src/app/models/core/server/study.plan.server.model';
import { StudyPlanAdapterService } from '../../helpers/adapters/study-plan-adapter.service';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { StudyPlanTermServer } from 'src/app/models/core/server/study.plan.term.server.model';
import { StudyPlanTermAdapterService } from '../../helpers/adapters/study-plan-term-adapter.service';
import { StudyTermCoursesModel } from 'src/app/models/utils/study.term.courses.model';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanService {

  constructor(private http : HttpClient,
    private applicationErrorService : ApplicationErrorService,
    private apiUrlService : ApiUrlService,
    private studyPlanAdapterService : StudyPlanAdapterService,
    private studyPlanTermAdapter : StudyPlanTermAdapterService) { }

  public getUserStudyPlan(userDegreeId : number): Observable<StudyPlanClient> {
    return this.http.get<StudyPlanClient>(`${this.apiUrlService.checkEnvironment()}/studyPlan/${userDegreeId}`)
      .pipe(
        map((studyPlan: StudyPlanServer) => {
          return this.studyPlanAdapterService.adaptServerToClient(studyPlan);
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }

  public createStudyPlan(studyPlan: StudyPlanClient): Observable<StudyPlanClient> {
    return this.http.post<StudyPlanClient>(`${this.apiUrlService.checkEnvironment()}/studyPlan`, studyPlan)
      .pipe(
        map((studyPlan: StudyPlanServer) => {
          return this.studyPlanAdapterService.adaptServerToClient(studyPlan);
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }

  public createStudyPlanTerm(studyPlan : StudyTermCoursesModel): Observable<StudyTermCoursesModel> {
    return this.http.post<StudyTermCoursesModel>(`${this.apiUrlService.checkEnvironment()}/studyPlan/studyPlanTerm`, studyPlan)
      .pipe(
        map((studyPlan: StudyTermCoursesModel) => {
          return studyPlan;
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }
}