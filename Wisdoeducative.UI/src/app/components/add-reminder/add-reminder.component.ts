import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectOptionModel} from "../../models/select.option.model";
import {Subscription} from "rxjs";
import {ButtonType} from "../../enums/button.enum";
import {FormService} from "../../services/components/form.service";
import {DialogComponent} from "../dialog/dialog.component";
import {ReminderClient} from "../../models/core/client/reminder.client.model";
import {ReminderService} from "../../services/core/models/reminder.service";
import {ApplicationErrorModel} from "../../models/application.error.model";
import {MessageModel} from "../../models/message.model";
import {MessageTypeEnum} from "../../enums/message.type.enum";
import {MessageService} from "../../services/core/message.service";

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.css']
})
export class AddReminderComponent {

  @ViewChild(DialogComponent) dialogComponent: DialogComponent;
  @Input() public courseEvaluationTaskId : number;
  //forms
  public reminderForm : FormGroup;

  //data
  public options : SelectOptionModel[] = [];
  public subscriptions : Subscription[] = [];

  //util
  public ButtonType = ButtonType;

  constructor(private fb : FormBuilder,
              private formService : FormService,
              private reminderService : ReminderService,
              private messageService : MessageService) { }

  ngOnInit(): void {
    this.createForm();
  }

  public openDialog(): void {
    this.dialogComponent.show();
  }

  private createForm() {
    this.reminderForm = this.fb.group({
      name: ['', [Validators.required]],
      date: [new Date(), [Validators.required]]
    });
  }

  public addReminder() {
    let reminderClient : ReminderClient | null =
      this.formService.validateForm(this.reminderForm, ReminderClient);
    if(!reminderClient) return null;
    this.createReminder(reminderClient);
  }

  private createReminder(reminderClient: ReminderClient) {
    reminderClient.courseEvaluationTaskId = this.courseEvaluationTaskId;
    this.subscriptions.push(
      this.reminderService.createReminder(reminderClient).subscribe({
        next: (reminderClient : ReminderClient) => {
          this.dialogComponent.hide();
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, "Error", error.errorCode))
        }
      })
    );
  }
}
