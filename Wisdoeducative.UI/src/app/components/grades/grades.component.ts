import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CourseClient} from "../../models/core/client/course.client.model";
import {CourseEvaluationService} from "../../services/core/models/course-evaluation.service";
import {MessageService} from "../../services/core/message.service";
import {Subscription} from "rxjs";
import {CourseEvaluationClient} from "../../models/core/client/course.evaluation.client.model";
import {ApplicationErrorModel} from "../../models/application.error.model";
import {MessageTypeEnum} from "../../enums/message.type.enum";
import {MessageModel} from "../../models/message.model";
import {CourseEvaluationTaskClient} from "../../models/core/client/course.evaluation.task.client.model";
import {ButtonType} from "../../enums/button.enum";
import {Router} from "@angular/router";
import {CourseService} from "../../services/core/models/course.service";

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit{

  @Input() course : CourseClient;
  public totalScore : number = 0;

  //util
  public subscriptions : Subscription[] = [];

  constructor(private courseEvaluationService : CourseEvaluationService,
              private messageService : MessageService,
              private router : Router,
              private courseService : CourseService) {
  }

  public getCourseGrade() {
    if (this.totalScore == null) {
      return "0%";
    } else {
      return this.totalScore + "%";
    }
  }

  ngOnInit(): void {
    this.getAllGrades();
  }

  private getAllGrades() {
    this.subscriptions.push(
      this.courseEvaluationService.getCourseEvaluations(this.course.id).subscribe({
        next : (courseEvaluations : CourseEvaluationClient[]) => {
          courseEvaluations.forEach(courseEvaluation => {
            this.getCourseEvaluationTasks(courseEvaluation.id);
          })
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode));
        }
      })
    )
  }

  private getCourseEvaluationTasks(id: number) {
    this.subscriptions.push(
      this.courseEvaluationService.getCourseEvaluationTasks(id).subscribe({
        next : (courseEvaluationTasks : CourseEvaluationTaskClient[]) => {
          courseEvaluationTasks.forEach(courseEvaluationTask => {
            this.totalScore += courseEvaluationTask.totalScore;
          })
          this.updateCourseGrade();
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode));
        }
      })
    )
  }

  public getIcon(): string {
    if(this.totalScore < 70){
      return 'fa-solid fa-face-tired fa-4x'
    } else if (this.totalScore >= 70 && this.totalScore < 90){
      return 'fa-solid fa-face-meh fa-4x'
    } else {
      return 'fa-solid fa-face-laugh-wink fa-4x'
    }
  }

  public getScoreCode() {
    if(this.totalScore < 70){
      return 'GradeFail'
    } else if (this.totalScore >= 70 && this.totalScore < 90){
      return 'GradeMeh'
    } else {
      return 'GradeGood'
    }
  }

  protected readonly ButtonType = ButtonType;

  public completeCourse() {
    this.subscriptions.push(
      this.courseEvaluationService.completeCourse(this.course.id).subscribe({
        next : () => {
          this.router.navigate(['workspace/study-plan']);
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode));
        }
      })
    )
  }

  private updateCourseGrade() {
    this.subscriptions.push(
      this.courseService.setGrade(this.course.id, {grade : this.totalScore}).subscribe({
        next : (course : CourseClient) => {
          this.course = course;
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode));
        }
      }
    ))
  }
}
