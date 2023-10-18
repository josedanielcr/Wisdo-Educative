import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonType } from 'src/app/enums/button.enum';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platform } from 'src/app/models/utils/platform.model';
import { CourseEvaluationService } from 'src/app/services/core/models/course-evaluation.service';
import { MessageService } from 'src/app/services/core/message.service';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { MessageModel } from 'src/app/models/message.model';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { Subscription } from 'rxjs';
import { CourseLinkClient } from 'src/app/models/core/client/course.link.client.model';
import { FormService } from 'src/app/services/components/form.service';
import { LinkPlatformPickerComponent } from '../link-platform-picker/link-platform-picker.component';
import { CourseLinkService } from 'src/app/services/core/models/course-link.service';
import { CourseLinkDialogComponent } from '../course-link-dialog/course-link-dialog.component';

@Component({
  selector: 'app-course-link',
  templateUrl: './course-link.component.html',
  styleUrls: ['./course-link.component.css']
})
export class CourseLinkComponent implements OnInit, OnDestroy {

  @ViewChild(CourseLinkDialogComponent) linkDialog: CourseLinkDialogComponent;
  @Input() course: CourseClient;
  public tasks : CourseEvaluationTaskClient[] = [];
  public links : CourseLinkClient[] = [];

  //forms
  public linkForm : FormGroup;

  //util
  public ButtonType = ButtonType;
  public selectedPlatform : Platform;
  public subscriptions : Subscription[] = [];

  constructor(private fb : FormBuilder,
    private evaluationService : CourseEvaluationService,
    private messageService : MessageService,
    private formService : FormService,
    private courseLinkService : CourseLinkService) { }

  ngOnInit(): void {
    this.loadCourseEvalutionTasks();
    this.loadCourseLinks();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription : Subscription) => {
      subscription.unsubscribe();
    });
  }

  private loadCourseEvalutionTasks(): void {
    this.subscriptions.push(
      this.evaluationService.getCourseTasks(this.course.id).subscribe({
        next: (tasks : CourseEvaluationTaskClient[]) => {
          this.tasks = tasks;
        },
        error: (err : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', err.errorCode));
        }
      })
    );
  }

  private loadCourseLinks(): void {
    this.subscriptions.push(
      this.courseLinkService.getCourseLinksByCourseId(this.course.id).subscribe({
        next: (links : CourseLinkClient[]) => {
          this.links = links;
          console.log(this.links);
        },
        error: (err : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', err.errorCode));
        }
      })
    )
  }

  public AddLink(): void {
    this.linkDialog.AddLink();
  }

  public updateLinks(links : CourseLinkClient[]): void {
    this.links = links;
  }
}
