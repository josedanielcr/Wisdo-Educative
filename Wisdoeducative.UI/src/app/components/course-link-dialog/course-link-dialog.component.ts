import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from 'src/app/enums/button.enum';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { Platform } from 'src/app/models/utils/platform.model';
import { DialogComponent } from '../dialog/dialog.component';
import { LinkPlatformPickerComponent } from '../link-platform-picker/link-platform-picker.component';
import { CourseLinkClient } from 'src/app/models/core/client/course.link.client.model';
import { FormService } from 'src/app/services/components/form.service';
import { Subscription } from 'rxjs';
import { CourseLinkService } from 'src/app/services/core/models/course-link.service';
import { MessageService } from 'src/app/services/core/message.service';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { MessageModel } from 'src/app/models/message.model';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';

@Component({
  selector: 'app-course-link-dialog',
  templateUrl: './course-link-dialog.component.html',
  styleUrls: ['./course-link-dialog.component.css']
})
export class CourseLinkDialogComponent implements OnInit {

  @ViewChild(LinkPlatformPickerComponent) platformPicker: LinkPlatformPickerComponent;
  @ViewChild(DialogComponent) dialog: DialogComponent;
  @Input() course : CourseClient;
  @Input() tasks : CourseEvaluationTaskClient[] = [];
  @Output() linksOutput : EventEmitter<CourseLinkClient[]> = new EventEmitter<CourseLinkClient[]>();
  @Output() linkUpdateOutput : EventEmitter<CourseLinkClient> = new EventEmitter<CourseLinkClient>();
  @Input() links : CourseLinkClient[] = [];
  public linkToUpdate : CourseLinkClient;

  //form
  public linkForm : FormGroup;

  //util
  public selectedPlatform : Platform;
  public ButtonType = ButtonType;
  public subscriptions : Subscription[] = [];
  public isUpdate : boolean = false;

  constructor(private fb : FormBuilder,
    private formService : FormService,
    private courseLinkService : CourseLinkService,
    private messageService : MessageService) { }

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.linkForm = this.fb.group({
      link: ['', [Validators.required]],
      name: ['', [Validators.required]],
      task: ['', [Validators.required]]
    });
  }

  public updateLink(courseLinkClient : CourseLinkClient): void {
    this.linkToUpdate = courseLinkClient;
    this.isUpdate = true;
    this.dialog.show();
    this.linkForm.patchValue({
      link: courseLinkClient.link,
      name: courseLinkClient.name,
      task: courseLinkClient.courseEvaluationTask.name
    });
    this.platformPicker.setDefaultPlatform(courseLinkClient.platform);
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
    this.executeLinkCreation(link);
  }

  private executeLinkCreation(link: CourseLinkClient) {
    this.validateLink(link);
    if(this.isUpdate) this.executeLinkUpdateRequest(link);
    else this.executeLinkCreationRequest(link)
  }

  executeLinkUpdateRequest(link: CourseLinkClient) {
    this.subscriptions.push(
      this.courseLinkService.updateCourseLink(this.linkToUpdate.id, link).subscribe({
        next: (link : CourseLinkClient) => {
          this.linkUpdateOutput.emit(link);
          this.dialog.hide();
          this.linkForm.reset();
        },
        error: (err : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', err.errorCode));
        }
      })
    );  
  }

  executeLinkCreationRequest(link: CourseLinkClient) {
    this.subscriptions.push(
      this.courseLinkService.createCourseLink(link).subscribe({
        next: (link : CourseLinkClient) => {
          this.links.push(link);
          this.linksOutput.emit(this.links);
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
