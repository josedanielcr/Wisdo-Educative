import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DialogType } from 'src/app/enums/dialog.type.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { StudyTermCoursesModel } from 'src/app/models/utils/study.term.courses.model';
import { CourseService } from 'src/app/services/core/models/course.service';
import { UserInitializationService } from 'src/app/services/helpers/user-initialization.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-study-plan',
  templateUrl: './study-plan.component.html',
  styleUrls: ['./study-plan.component.css']
})
export class StudyPlanComponent implements OnInit {

  //children
  @ViewChild(DialogComponent) dialogComponent: DialogComponent;

  //properties
  public user : UserClient;
  public userDegree : UserDegreeClient;
  public studyPlan : StudyPlanClient;
  public studyPlanTerms : StudyPlanTermClient[];
  public defaultStudyPlanTerm : StudyPlanTermClient;
  public defaultStudyPlanTemCourses : CourseClient[];
  public newlyCreatedStudyPlanTerm : StudyTermCoursesModel;

  //util
  public isNewStudyPlanTermOpen : boolean = false;
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  public isCardView : boolean = true;
  public DialogType = DialogType;

  constructor(private userInitializationService : UserInitializationService,
    private courseService : CourseService,
    private windowService : WindowResizeService,
    private cdr : ChangeDetectorRef,
    private router : Router) { }

  ngOnInit(): void {
    this.userInitialization();
    this.subscribeToWindowService();
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  private userInitialization(): void {
    this.userInitializationService.initializeUser().subscribe(
      ([user, userDegree, studyPlan, studyPlanTerms]) => {
        this.user = user;
        this.userDegree = userDegree;
        this.studyPlan = studyPlan;
        this.studyPlanTerms = studyPlanTerms;
        this.validateStudyPlanTerms(studyPlanTerms);
        this.defaultStudyPlanTerm = this.setInProgressStudyPlanTerm(studyPlanTerms);
        this.setDefaultStudyPlanTermCourses(this.defaultStudyPlanTerm.id);
      }
    );
  }

  private validateStudyPlanTerms(studyPlanTerms : StudyPlanTermClient[]): void {
    if(studyPlanTerms.length === 0) {
      this.router.navigate(['/workspace/new-study-plan'])
    }
  }

  private setInProgressStudyPlanTerm(studyPlanTerms: StudyPlanTermClient[]): StudyPlanTermClient {
    const currentStudyPlanTerm : StudyPlanTermClient =
       studyPlanTerms.filter((studyPlanTerm: StudyPlanTermClient) => 
        studyPlanTerm.studyTermStatus == "InProgress")[0];
    this.studyPlanTerms = this.removeInProgressStudyPlanTerm(studyPlanTerms);
    return currentStudyPlanTerm;
  }

  private removeInProgressStudyPlanTerm(studyPlanTerms : StudyPlanTermClient[]): StudyPlanTermClient[] {
    studyPlanTerms.forEach((studyPlanTerm: StudyPlanTermClient) => {
      if (studyPlanTerm.studyTermStatus == "InProgress") {
        studyPlanTerms.splice(studyPlanTerms.indexOf(studyPlanTerm), 1);
      }
    });
    return studyPlanTerms;
  }

  private setDefaultStudyPlanTermCourses(id: number): void  {
    this.courseService.getStudyPlanTermCourses(id).subscribe({
      next : (courses : CourseClient[]) => {
        this.defaultStudyPlanTemCourses = courses; 
      },
      error : (err : ApplicationErrorModel) => {
        console.log(err);
      }
    })
  }

  public filterCourses(courses : CourseClient[]){
    this.defaultStudyPlanTemCourses = courses;
  }

  public switchView(isCardView : boolean): void {
    this.isCardView = isCardView;
  }

  public toggleNewStudyPlanTerm(): void {
    this.isNewStudyPlanTermOpen = !this.isNewStudyPlanTermOpen;
  }

  public hideNewStudyPlanTermWindow(): void {
    this.isNewStudyPlanTermOpen = false;
  }
}