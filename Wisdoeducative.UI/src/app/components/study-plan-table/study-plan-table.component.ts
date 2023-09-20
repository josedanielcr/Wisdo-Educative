import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { MessageModel } from 'src/app/models/message.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { MessageService } from 'src/app/services/core/message.service';
import { CourseService } from 'src/app/services/core/models/course.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-study-plan-table',
  templateUrl: './study-plan-table.component.html',
  styleUrls: ['./study-plan-table.component.css']
})
export class StudyPlanTableComponent implements OnInit {
  
  @Input() courses: CourseClient[] = [];
  @Input() studyPlanTerms : StudyPlanTermClient[] = [];
  @Input() typeOfSchedule : string;
  @Output() clickedStudyTerm : EventEmitter<StudyPlanTermClient> 
    = new EventEmitter<StudyPlanTermClient>();
  @Output() courseChanges : EventEmitter<CourseClient[]> = new EventEmitter<CourseClient[]>();
  public isCourseTable: boolean;

  //util
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;

  constructor(private windowService : WindowResizeService,
    private courseService : CourseService,
    private messageService : MessageService) { }

  ngOnInit(): void {
    this.setTypeOfTable();
    this.subscribeToWindowService();
  }

  public canShowProgress() : boolean {
    if(!this.isCourseTable && !this.isDesktop) return false;
    return true;
  }

  public canShowCredits(): boolean {
    if(this.isCourseTable && !this.isDesktop) return false;
    return true;
  }

  public getCourseProgress(currentProgress: string): number{
    try {
      return Number(currentProgress);
    } catch (error) {
      return 0;
    }
  }

  private setTypeOfTable(): void {
    this.isCourseTable = this.courses.length > 0 ? true : false;
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  public emitClickedStudyTerm(studyPlanTerm : StudyPlanTermClient): void {
    this.clickedStudyTerm.emit(studyPlanTerm);
  }

  public addToFavorite(courseId : number): void {
    this.courseService.addToFavorite(courseId).subscribe({
      next : (course : CourseClient) => {
        this.messageService.show(new MessageModel(MessageTypeEnum.Success, 'Success' 
        ,`${course.name} successfully modified to your favorite list`));
        let index = this.courses.findIndex(c => c.id == course.id);
        this.courses[index] = course;
        this.courseChanges.emit(this.courses);
      },
      error : (error : ApplicationErrorModel) => {
        this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error' ,error.message))
      }
    });
  }
}
