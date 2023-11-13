import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApplicationErrorService} from "../../helpers/application-error.service";
import {ApiUrlService} from "../../helpers/api-url.service";
import {SpinnerService} from "../spinner.service";
import {ReminderClient} from "../../../models/core/client/reminder.client.model";
import {catchError, finalize, map, Observable} from "rxjs";
import {ReminderServer} from "../../../models/core/server/reminder.server.model";
import {ReminderAdapterService} from "../../helpers/adapters/reminder-adapter.service";

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private http : HttpClient,
              private applicationErrorService : ApplicationErrorService,
              private apiUrlService : ApiUrlService,
              private spinnerService : SpinnerService,
              private reminderAdapterService : ReminderAdapterService) { }

  public createReminder(reminder : ReminderClient) : Observable<ReminderClient> {
    this.spinnerService.show();
    return this.http.post<ReminderClient>(`${this.apiUrlService.checkEnvironment()}/Reminder`, reminder)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((reminder: ReminderServer) => {
          return this.reminderAdapterService.adaptServerToClient(reminder);
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }

  public getAllReminders(studyPlanId : number) : Observable<ReminderClient[]> {
    this.spinnerService.show();
    return this.http.get<ReminderClient[]>(`${this.apiUrlService.checkEnvironment()}/Reminder/all/${studyPlanId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((reminders: ReminderServer[]) => {
          return reminders.map(reminder => this.reminderAdapterService.adaptServerToClient(reminder));
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }

  public deleteReminder(reminderId : number) : Observable<any> {
    this.spinnerService.show();
    return this.http.delete(`${this.apiUrlService.checkEnvironment()}/Reminder/${reminderId}`)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }

  public updateReminder(reminder : ReminderClient) : Observable<ReminderClient> {
    this.spinnerService.show();
    return this.http.put<ReminderClient>(`${this.apiUrlService.checkEnvironment()}/Reminder`, reminder)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
        map((reminder: ReminderServer) => {
          return this.reminderAdapterService.adaptServerToClient(reminder);
        }),
        catchError((error: any) => { throw this.applicationErrorService.parseHttpError(error); })
      );
  }
}
