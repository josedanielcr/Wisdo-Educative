import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, takeLast } from 'rxjs';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { CourseLinkClient } from 'src/app/models/core/client/course.link.client.model';
import { MessageModel } from 'src/app/models/message.model';
import { CourseLinkFilters } from 'src/app/models/utils/course.link.filters.model';
import { MessageService } from 'src/app/services/core/message.service';
import { CourseLinkService } from 'src/app/services/core/models/course-link.service';

@Component({
  selector: 'app-course-link-filters',
  templateUrl: './course-link-filters.component.html',
  styleUrls: ['./course-link-filters.component.css']
})
export class CourseLinkFiltersComponent implements OnInit{

  @Input() course : CourseClient;
  @Input() tasks : CourseEvaluationTaskClient[] = [];
  @Input() isFilter : boolean = false;
  @Output() courseLinksEmitter : EventEmitter<CourseLinkClient[]> = new EventEmitter<CourseLinkClient[]>();

  //forms
  public courseLinkForm : FormGroup;
  public subscriptions : Subscription[] = [];

  constructor(private fb : FormBuilder,
    private courseLinkService : CourseLinkService,
    private messageService : MessageService) { }

  ngOnInit(): void {
    this.courseLinkForm = this.fb.group({
      task : ['']
    });
  }

  public onTaskChange(taskName : string): void {
    if(!this.validateSelectedTask(taskName)) return;
    this.executeCourseLinkSearch(taskName);
  }

  private executeCourseLinkSearch(taskName: string): void {
    this.subscriptions.push(
      this.courseLinkService.filterCourseLinks(new CourseLinkFilters(taskName, this.course.id)).subscribe({
        next : (courseLinks : CourseLinkClient[]) => {
          this.courseLinksEmitter.emit(courseLinks);
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode))
        }
      })
    );
  }

  private validateSelectedTask(taskName: string): boolean {
    if(taskName === '') return true;
    const courseTask : CourseEvaluationTaskClient = this.tasks.find(t => t.name.toUpperCase() 
      === taskName.toUpperCase());
    if(!courseTask) return false;
    return true;
  }
  
}