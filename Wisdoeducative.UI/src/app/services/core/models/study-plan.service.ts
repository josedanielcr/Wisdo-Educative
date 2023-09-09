import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { ApiUrlService } from '../../helpers/api-url.service';
import { Observable, catchError, finalize, map } from 'rxjs';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanServer } from 'src/app/models/core/server/study.plan.server.model';
import { StudyPlanAdapterService } from '../../helpers/adapters/study-plan-adapter.service';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { StudyPlanTermServer } from 'src/app/models/core/server/study.plan.term.server.model';
import { StudyPlanTermAdapterService } from '../../helpers/adapters/study-plan-term-adapter.service';
import { StudyTermCoursesModel } from 'src/app/models/utils/study.term.courses.model';
import { SpinnerService } from '../spinner.service';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanService {

  constructor(private http : HttpClient,
    private applicationErrorService : ApplicationErrorService,
    private apiUrlService : ApiUrlService,
    private studyPlanAdapterService : StudyPlanAdapterService,
    private studyPlanTermAdapter : StudyPlanTermAdapterService,
    private spinnerService : SpinnerService) { }

  public getUserStudyPlan(studyPlanId : number): Observable<StudyPlanClient> {
    this.spinnerService.show();
    return this.http.get<StudyPlanClient>(`${this.apiUrlService.checkEnvironment()}/studyPlan/${studyPlanId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((studyPlan: StudyPlanServer) => {
          return this.studyPlanAdapterService.adaptServerToClient(studyPlan);
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }

  
  public getUserStudyPlanByUserDegree(userDegreeId : number): Observable<StudyPlanClient> {
    this.spinnerService.show();
    return this.http.get<StudyPlanClient>(`${this.apiUrlService.checkEnvironment()}/studyPlan/user-degree/${userDegreeId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((studyPlan: StudyPlanServer) => {
          return this.studyPlanAdapterService.adaptServerToClient(studyPlan);
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }

  public createStudyPlan(studyPlan: StudyPlanClient): Observable<StudyPlanClient> {
    this.spinnerService.show();
    return this.http.post<StudyPlanClient>(`${this.apiUrlService.checkEnvironment()}/studyPlan`, studyPlan)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((studyPlan: StudyPlanServer) => {
          return this.studyPlanAdapterService.adaptServerToClient(studyPlan);
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }

  public createStudyPlanTerm(studyPlan : StudyTermCoursesModel): Observable<StudyTermCoursesModel> {
    this.spinnerService.show();
    return this.http.post<StudyTermCoursesModel>(`${this.apiUrlService.checkEnvironment()}/studyPlan/study-plan-term`, studyPlan)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((studyPlan: StudyTermCoursesModel) => {
          return studyPlan;
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }

  public getStudyPlanTerms(studyPlanId : number): Observable<StudyPlanTermClient[]> {
    this.spinnerService.show();
    return this.http.get<StudyPlanTermServer[]>(`${this.apiUrlService.checkEnvironment()}/studyPlan/study-plan-terms/${studyPlanId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((studyPlanTerms: StudyPlanTermServer[]) => {
          return studyPlanTerms.map((studyPlanTerm : StudyPlanTermServer) => {
            return this.studyPlanTermAdapter.adaptServerToClient(studyPlanTerm);
          });
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }
}