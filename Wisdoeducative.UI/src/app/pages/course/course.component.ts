import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { MessageModel } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/core/message.service';
import { CourseService } from 'src/app/services/core/models/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{

  //properties
  public courseId : number;
  public course : CourseClient;
  public currentStep : number = 0;

  //subscriptions
  private subscriptions : Subscription[] = [];

  constructor(private activatedRoute : ActivatedRoute,
    private courseService : CourseService,
    private messageService : MessageService,
    private location : Location) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.courseId = params['id'];
      this.getCourse();
    }));
  }

  private getCourse(): void {
    this.subscriptions.push(
      this.courseService.getCourseById(this.courseId).subscribe({
        next : (course : CourseClient) => {
          this.course = course;
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode));
          setTimeout(() => {
            this.location.back();
          }, 3000);
        }
      })
    )
  }

  public changeStep(step : number): void {
    this.currentStep = step;
  }

}
