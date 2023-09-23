import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { StudyPlanFiltersComponent } from 'src/app/components/study-plan-filters/study-plan-filters.component';
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
export class StudyPlanComponent implements OnInit, OnDestroy {

  //children
  @ViewChild(DialogComponent) dialogComponent: DialogComponent;
  @ViewChild(StudyPlanFiltersComponent) studyPlanFiltersComponent: StudyPlanFiltersComponent;

  //properties
  public user : UserClient;
  public userDegree : UserDegreeClient;
  public studyPlan : StudyPlanClient;
  public studyPlanTerms : StudyPlanTermClient[];
  public defaultStudyPlanTerm : StudyPlanTermClient;
  public defaultStudyPlanTemCourses : CourseClient[];
  public activeStudyPlanTermCourses : CourseClient[];
  public selectedStudyPlanTerm : StudyTermCoursesModel;

  //util
  public isNewStudyPlanTermOpen : boolean = false;
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  public isCardView : boolean = true;
  public DialogType = DialogType;
  public isSearchActive : boolean = false;
  public isSelectedStudyPlanTermOpen : boolean = false;

  //subscriptions
  private subscriptions : Subscription[] = [];

  constructor(private userInitializationService : UserInitializationService,
    private courseService : CourseService,
    private windowService : WindowResizeService,
    private cdr : ChangeDetectorRef,
    private router : Router) { }

  ngOnInit(): void {
    this.userInitialization();
    this.subscribeToWindowService();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private subscribeToWindowService() {
    this.subscriptions.push(this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    }));
  }

  private userInitialization(): void {
    this.subscriptions.push(this.userInitializationService.initializeUser().subscribe(
      ([user, userDegree, studyPlan, studyPlanTerms]) => {
        this.user = user;
        this.userDegree = userDegree;
        this.studyPlan = studyPlan;
        this.studyPlanTerms = studyPlanTerms;
        this.validateStudyPlanTerms(studyPlanTerms);
        this.defaultStudyPlanTerm = this.setInProgressStudyPlanTerm(studyPlanTerms);
        this.setDefaultStudyPlanTermCourses(this.defaultStudyPlanTerm.id);
      }
    ));
  }

  private validateStudyPlanTerms(studyPlanTerms : StudyPlanTermClient[]): void {
    if(!studyPlanTerms)this.router.navigate(['/workspace/new-study-plan']);
    if(studyPlanTerms.length === 0) this.router.navigate(['/workspace/new-study-plan']);
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
    this.subscriptions.push(this.courseService.getStudyPlanTermCourses(id).subscribe({
      next : (courses : CourseClient[]) => {
        this.defaultStudyPlanTemCourses = courses; 
        this.activeStudyPlanTermCourses = courses;
        this.sortCoursesByFavorite();
      },
      error : (err : ApplicationErrorModel) => {
        console.log(err);
      }
    }));
  }

  private sortCoursesByFavorite(): void {
    this.activeStudyPlanTermCourses.sort((a: CourseClient, b: CourseClient) => {
      if (a.isFavorite && !b.isFavorite) {
        return -1;
      }
      if (!a.isFavorite && b.isFavorite) {
        return 1;
      }
      return 0;
    });
  }

  public cleanSearchResults(): void {
    this.studyPlanFiltersComponent.clearFilters();
    this.activeStudyPlanTermCourses = this.defaultStudyPlanTemCourses;
  }

  public switchSearchBar(isSearchActive : boolean): void {
    this.isSearchActive = isSearchActive;
  }

  public filterCourses(courses : CourseClient[]){
    this.activeStudyPlanTermCourses = courses;
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

  public toggleSelectedStudyPlanTerm(studyPlanTerm : StudyPlanTermClient): void {
    this.setStudyPlanTermCourses(studyPlanTerm);
  }

  private setStudyPlanTermCourses(studyPlanTerm: StudyPlanTermClient): void {
    this.subscriptions.push(this.courseService.getStudyPlanTermCourses(studyPlanTerm.id).subscribe({
      next: (courses: CourseClient[]) => {
        this.selectedStudyPlanTerm = new StudyTermCoursesModel();
        this.selectedStudyPlanTerm.studyPlanTermDto = studyPlanTerm;
        this.selectedStudyPlanTerm.coursesDtos = courses;
        this.isSelectedStudyPlanTermOpen = true;
        this.cdr.detectChanges();
        this.dialogComponent.show();
      },
      error: (err: ApplicationErrorModel) => {
        console.log(err);
      }
    }));
  }

  public updateCoursesList(coursesClient : CourseClient[]): void {
    this.activeStudyPlanTermCourses = coursesClient;
    this.sortCoursesByFavorite();
  }

  public updateSingleActiveCourse(courseClient : CourseClient) : void {
    let index = this.activeStudyPlanTermCourses.findIndex(c => c.id == courseClient.id);
    this.activeStudyPlanTermCourses[index] = courseClient;
    this.sortCoursesByFavorite();
  }

  public getCurrentStatusIcon(status : string): string {
    switch(status) {
      case 'Completed':
        return '../../../assets/icons/check.png';
      case 'Finished':
        return '../../../assets/icons/check.png';
      case 'InProgress':
        return '../../../assets/icons/in-progress.png';
      case 'NotStarted':
        return '../../../assets/icons/pending.png';
      default:
        return '';
    }
  }
}