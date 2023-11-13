import {ChangeDetectorRef, Component, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CourseEvaluationTaskClient} from "../../models/core/client/course.evaluation.task.client.model";
import {DialogComponent} from "../dialog/dialog.component";
import {AddReminderComponent} from "../add-reminder/add-reminder.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {InputTextComponent} from "../input/input-text/input-text.component";
import {ButtonType} from "../../enums/button.enum";
import {CourseEvaluationService} from "../../services/core/models/course-evaluation.service";
import {MessageService} from "../../services/core/message.service";
import {ApplicationErrorModel} from "../../models/application.error.model";
import {MessageTypeEnum} from "../../enums/message.type.enum";
import {MessageModel} from "../../models/message.model";
import {CompleteEvaluationTaskComponent} from "../complete-evaluation-task/complete-evaluation-task.component";

@Component({
  selector: 'app-evaluation-task-overview',
  templateUrl: './evaluation-task-overview.component.html',
  styleUrls: ['./evaluation-task-overview.component.css']
})
export class EvaluationTaskOverviewComponent {

  @ViewChild(DialogComponent) dialogComponent: DialogComponent;
  @ViewChild(AddReminderComponent) addReminderComponent: AddReminderComponent;
  @ViewChildren(InputTextComponent) inputTextComponents: QueryList<InputTextComponent>;
  @ViewChild(CompleteEvaluationTaskComponent) completeEvaluationTaskComponent: CompleteEvaluationTaskComponent;

  public evaluationTask : CourseEvaluationTaskClient;

  //forms
  public evaluationTaskForm: FormGroup;

  constructor(private fb : FormBuilder,
              private cdr : ChangeDetectorRef,
              private courseEvaluationService : CourseEvaluationService,
              private messageService : MessageService) {
  }

  public setEvaluationTask(evaluationTask : CourseEvaluationTaskClient) {
    this.evaluationTask = evaluationTask;
    this.initiliazeForms();
    this.dialogComponent.show();
  }

  public show(): void {
    this.cdr.detectChanges();
    if(this.dialogComponent == null || !this.evaluationTask) return;
    this.initiliazeForms();
    this.dialogComponent.show();
  }

  public openAddReminder() {
    this.addReminderComponent.openDialog();
  }

  private initiliazeForms() {
    this.evaluationTaskForm = this.fb.group({
      name: [this.evaluationTask.name],
      description: [this.evaluationTask.description],
    });
    this.disableInputs();
  }

  private disableInputs() {
    this.inputTextComponents.forEach((inputTextComponent) => {
      inputTextComponent.setDisabledState(true);
    });
  }

  protected readonly ButtonType = ButtonType;

  public updateTaskInfo() {
    this.dialogComponent.hide();
    this.evaluationTask.name = this.evaluationTaskForm.get('name').value;
    this.evaluationTask.description = this.evaluationTaskForm.get('description').value;
    this.courseEvaluationService.updateCourseEvaluationTask(this.evaluationTask).subscribe({
      next: (courseEvaluationTask : CourseEvaluationTaskClient) => {
        this.evaluationTask = courseEvaluationTask;
      },
      error: (error : ApplicationErrorModel) => {
        this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode))
      }
    });
  }

  public completeTask() {
    this.completeEvaluationTaskComponent.openDialog();
  }
}
