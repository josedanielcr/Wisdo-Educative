import {Component, Input, OnInit} from '@angular/core';
import {StudyPlanClient} from "../../models/core/client/study.plan.client.model";
import {ReminderService} from "../../services/core/models/reminder.service";
import {Subscription} from "rxjs";
import {ReminderClient} from "../../models/core/client/reminder.client.model";
import {MessageService} from "../../services/core/message.service";
import {ApplicationErrorModel} from "../../models/application.error.model";
import {MessageModel} from "../../models/message.model";
import {MessageTypeEnum} from "../../enums/message.type.enum";

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  @Input() public studyPlan : StudyPlanClient;

  //util
  public subscriptions : Subscription[] = [];
  public reminderDates : Date[] = [];
  public currDate : number = 0;

  //data
  public reminders : ReminderClient[] = [];

  constructor(private reminderService : ReminderService,
              private messageService : MessageService) { }

  ngOnInit(): void {
    this.getAllReminders();
  }

  private setReminderDates(): void {
    let set : Set<Date> = new Set<Date>();
     this.reminders.forEach((reminder : ReminderClient) => {
       set.add(reminder.date);
     })
    this.reminderDates = Array.from(set);
    console.log(this.reminderDates);
  }

  public goBack(): void {
    if((this.currDate-1 < 0)) return;
    this.currDate--;
  }

  public goForward(): void {
    if(this.currDate+1 > this.reminderDates.length - 1) return;
    this.currDate++;
  }

  public getCurrReminderElements(currIndex : number): ReminderClient[] {
    return this.reminders.map((reminder : ReminderClient) => {
      if(reminder.date === this.reminderDates[currIndex]) return reminder;
      return null;
    } ).filter((reminder : ReminderClient) => reminder != null);
  }

  public deleteReminder(reminderId : number): void {
    this.subscriptions.push(
      this.reminderService.deleteReminder(reminderId).subscribe({
        next : () => {
          this.currDate = 0;
          this.getAllReminders();
          this.setReminderDates();
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error,"Error", error.errorCode))
        }
      })
    )
  }
  private getAllReminders() {
    this.subscriptions.push(
      this.reminderService.getAllReminders(this.studyPlan.id).subscribe({
        next : (reminders : ReminderClient[]) => {
          this.reminders = reminders;
          this.setReminderDates();
          console.log(reminders)
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error,"Error", error.errorCode))
        }
      })
    );
  }

  public updateReminder(reminder : ReminderClient): void {
    reminder.isCompleted = true;
    this.subscriptions.push(
      this.reminderService.updateReminder(reminder).subscribe({
        next : () => {
          this.currDate = 0;
          this.getAllReminders();
          this.setReminderDates();
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error,"Error", error.errorCode))
        }
      })
    )
  }
}
