import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { ApiUrlService } from '../../helpers/api-url.service';
import { SpinnerService } from '../spinner.service';
import { Observable, catchError, finalize, map } from 'rxjs';
import { UserStatistics } from 'src/app/models/utils/user.statistics.model';
import { StudyPlanServer } from 'src/app/models/core/server/study.plan.server.model';

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {

  constructor(private http : HttpClient,
    private applicationErrorService : ApplicationErrorService,
    private apiUrlService : ApiUrlService,
    private spinnerService : SpinnerService) { }

  public getUserStatistics(userId : number): Observable<UserStatistics> {
    this.spinnerService.show();
    return this.http.get<UserStatistics>(`${this.apiUrlService.checkEnvironment()}/userStatistics/statistics/${userId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((statistics: UserStatistics) => {
          return statistics;
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }
}
