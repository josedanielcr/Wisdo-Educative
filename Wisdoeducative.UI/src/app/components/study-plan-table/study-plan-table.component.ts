import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-study-plan-table',
  templateUrl: './study-plan-table.component.html',
  styleUrls: ['./study-plan-table.component.css']
})
export class StudyPlanTableComponent implements OnInit {

  //constants 
  public readonly statusMap : Map<string, string> = new Map([
    ['Failed', 'Failed'],
    ['Completed', 'Completed'],
    ['InProgress', 'In progress'],
    ['NotStarted', 'Not started'],
    ['Finished', 'Finished']
  ]);

  @Input() courses: CourseClient[] = [];
  @Input() studyPlanTerms : StudyPlanTermClient[] = [];
  @Input() typeOfSchedule : string;
  @Output() clickedStudyTerm : EventEmitter<StudyPlanTermClient> 
    = new EventEmitter<StudyPlanTermClient>();
  public isCourseTable: boolean;

  //util
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;

  constructor(private windowService : WindowResizeService) { }

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
}
