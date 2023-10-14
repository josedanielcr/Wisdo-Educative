import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-course-link',
  templateUrl: './course-link.component.html',
  styleUrls: ['./course-link.component.css']
})
export class CourseLinkComponent implements OnInit {

  @ViewChild(DialogComponent) dialog: DialogComponent;
  @ViewChild(LinkPlatformPickerComponent) platformPicker: LinkPlatformPickerComponent;
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
    this.initializeForms();
    this.loadCourseEvalutionTasks();
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

  private initializeForms(): void  {
    this.linkForm = this.fb.group({
      link: ['', [Validators.required]],
      name: ['', [Validators.required]],
      task: ['', [Validators.required]]
    });
  }

  public AddLink(): void {
    this.dialog.show();
  }

  public setSelectedPlatform(platform : Platform): void {
    this.selectedPlatform = platform;
  }

  public saveLink(): void {
    let link : CourseLinkClient | null =
    this.formService.validateForm(this.linkForm, CourseLinkClient);
    if(!link) return null;
    this.executeLinkCreationRequest(link);
  }

  private executeLinkCreationRequest(link: CourseLinkClient) {
    this.validateLink(link);
    this.subscriptions.push(
      this.courseLinkService.createCourseLink(link).subscribe({
        next: (link : CourseLinkClient) => {
          this.links.push(link);
          this.dialog.hide();
          this.linkForm.reset();
        },
        error: (err : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', err.errorCode));
        }
      })
    );
  }

  private validateLink(link: CourseLinkClient) {
    this.addTaskIdToLink(link);
    this.addPlatformToLink(link);
    delete link['task'];
  }

  private addTaskIdToLink(link: CourseLinkClient) {
    let found : boolean = false;
    this.tasks.forEach((task : CourseEvaluationTaskClient) => {
      if(task.name.toUpperCase() === link['task'].toUpperCase()){
        link.courseEvaluationTaskId = task.id;
        found = true;
      } 
    })
    if(!found) {
      this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', 'TaskNotFound'));
      return;
    }
  }

  private addPlatformToLink(link: CourseLinkClient) {
    link.platform = this.selectedPlatform.code;
  }
}
