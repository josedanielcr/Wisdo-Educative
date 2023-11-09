import {Component, Input, ViewChild} from '@angular/core';
import {CourseEvaluationTaskClient} from "../../models/core/client/course.evaluation.task.client.model";
import {DialogComponent} from "../dialog/dialog.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ButtonType} from "../../enums/button.enum";
import {CourseEvaluationService} from "../../services/core/models/course-evaluation.service";
import {MessageService} from "../../services/core/message.service";
import {ApplicationErrorModel} from "../../models/application.error.model";
import {MessageTypeEnum} from "../../enums/message.type.enum";
import {MessageModel} from "../../models/message.model";

@Component({
  selector: 'app-complete-evaluation-task',
  templateUrl: './complete-evaluation-task.component.html',
  styleUrls: ['./complete-evaluation-task.component.css']
})
export class CompleteEvaluationTaskComponent {

  @ViewChild(DialogComponent) dialog: DialogComponent;
  @Input() evaluationTask : CourseEvaluationTaskClient;

  //form
  public taskForm : FormGroup;


  constructor(private fb : FormBuilder,
              private courseEvaluationService : CourseEvaluationService,
              private messageService : MessageService) {
  }

  public openDialog() {
    this.dialog.show();
    this.initiateForm();
  }

  private initiateForm() {
    this.taskForm = this.fb.group({
      totalScore: [this.evaluationTask.totalScore]
    })
  }

  protected readonly ButtonType = ButtonType;

  public addScore() {
    this.evaluationTask.totalScore = this.taskForm.get('totalScore').value;
    this.dialog.hide();
    this.courseEvaluationService.completeCourseEvaluationTask(this.evaluationTask).subscribe({
      next: () => {
      },
      error: (error : ApplicationErrorModel) => {
        this.messageService.show(new MessageModel(MessageTypeEnum.Error,'Error',error.errorCode));
      }
    })
  }
}
