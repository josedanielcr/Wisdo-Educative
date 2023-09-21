import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { MessageModel } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/core/message.service';
import { CourseService } from 'src/app/services/core/models/course.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @Input() course: CourseClient;
  @Output() courseChanges : EventEmitter<CourseClient> = new EventEmitter<CourseClient>();

  constructor(private courseService : CourseService,
    private messageService : MessageService,
    private translocoService : TranslocoService) { }

  ngOnInit(): void {
    console.log(this.course);
    
  }

  public getCoursesProgress(): number {
    try {
      return Number(this.course.currentScore);
    } catch (error) {
      return 0;
    }
  }

  public addToFavorite(): void {
    this.courseService.addToFavorite(this.course.id).subscribe({
      next : (course : CourseClient) => {
        this.messageService.show(new MessageModel(MessageTypeEnum.Success, 'Success' 
        ,`CourseToFavorite`));
        this.courseChanges.emit(course);
      },
      error : (error : ApplicationErrorModel) => {
        this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error' ,error.message))
      }
    });
  }
}