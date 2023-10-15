import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { CourseLinkClient } from 'src/app/models/core/client/course.link.client.model';
import { MessageModel } from 'src/app/models/message.model';
import { Platform, platforms } from 'src/app/models/utils/platform.model';
import { MessageService } from 'src/app/services/core/message.service';
import { CourseLinkService } from 'src/app/services/core/models/course-link.service';
import { CourseLinkDialogComponent } from '../course-link-dialog/course-link-dialog.component';

@Component({
  selector: 'app-course-links-table',
  templateUrl: './course-links-table.component.html',
  styleUrls: ['./course-links-table.component.css']
})
export class CourseLinksTableComponent implements OnInit, OnDestroy{

  @ViewChild(CourseLinkDialogComponent) linkDialog : CourseLinkDialogComponent;
  @Input() courseLinks : CourseLinkClient[] = [];
  @Input() tasks : CourseEvaluationTaskClient[] = [];
  @Input() course : CourseClient;
  public map : Map<string, Platform> = new Map<string, Platform>();
  public subscriptions : Subscription[] = [];

  constructor(private courseLinkService : CourseLinkService,
    private messageService : MessageService) { }

  ngOnInit(): void {
    for (let platform of platforms) {
      this.map.set(platform.code, platform);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription : Subscription) => {
      subscription.unsubscribe();
    });
  }

  public deleteCourseLink(courseLink : CourseLinkClient): void {
    this.subscriptions.push(
      this.courseLinkService.deleteCourseLink(courseLink.id).subscribe({
        next : (result : boolean) => {
          if (result) {
            this.courseLinks = this.courseLinks.filter((link : CourseLinkClient) => {
              return link.id !== courseLink.id;
            });
          }
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Success, 'Error', error.errorCode))
        }
      })
    )
  }

  public openCourseLinkDialog(courseLink : CourseLinkClient): void {
    this.linkDialog.updateLink(courseLink);
  }

  public updateCourseLink(courseLink : CourseLinkClient): void {
    this.courseLinks = this.courseLinks.map((link : CourseLinkClient) => {
      if (link.id === courseLink.id) {
        link = courseLink;
      }
      return link;
    });
  }

  public openCourseLink(courseLink : CourseLinkClient): void {
    window.open(courseLink.link, '_blank');
  }
}
