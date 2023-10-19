import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationErrorService } from '../../helpers/application-error.service';
import { ApiUrlService } from '../../helpers/api-url.service';
import { PomodoroClient } from 'src/app/models/core/client/pomodoro.client';
import { Observable, catchError, finalize, map } from 'rxjs';
import { SpinnerService } from '../spinner.service';
import { PomodoroServer } from 'src/app/models/core/server/pomodoro.server';
import { PomodoroAdapterService } from '../../helpers/adapters/pomodoro-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {

  constructor(private http : HttpClient,
    private applicationErrorService : ApplicationErrorService,
    private apiUrlService : ApiUrlService,
    private spinnerService : SpinnerService,
    private pomodoroAdapter : PomodoroAdapterService) { }

  
    public createPomodoroSession(pomodoroClient : PomodoroClient) : Observable<any>{
      return this.http.post<PomodoroClient>(
        `${this.apiUrlService.checkEnvironment()}/Pomodoro`,
        pomodoroClient)
        .pipe(
          catchError((error: any) => {
            throw this.applicationErrorService.parseHttpError(error)
          })
        )
    }
}
