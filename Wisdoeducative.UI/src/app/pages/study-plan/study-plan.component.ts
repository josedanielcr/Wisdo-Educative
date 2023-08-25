import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { ButtonType } from 'src/app/enums/button.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { FormService } from 'src/app/services/components/form.service';
import { DegreeService } from 'src/app/services/core/models/degree.service';
import { StudyPlanService } from 'src/app/services/core/models/study-plan.service';
import { UserService } from 'src/app/services/core/models/user.service';
import { StoreService } from 'src/app/services/core/store.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-study-plan',
  templateUrl: './study-plan.component.html',
  styleUrls: ['./study-plan.component.css']
})
export class StudyPlanComponent implements OnInit {

  @ViewChild(DialogComponent) dialogComponent: DialogComponent;

  //properties
  public user : UserClient;
  public userDegree : UserDegreeClient;
  public studyPlan : StudyPlanClient;
  public studyPlanTerms : StudyPlanTermClient[] = [];

  //forms
  public courseForm : FormGroup;
  public studyTermForm : FormGroup;

  //utils
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  public ButtonType = ButtonType;

  constructor(private storeService : StoreService,
    private userService : UserService,
    private degreeService : DegreeService,
    private studyPlanService : StudyPlanService,
    private windowService : WindowResizeService,
    private fb : FormBuilder,
    private cd : ChangeDetectorRef,
    private formService : FormService) { }

  ngOnInit(): void {
    this.manageUserData();
    this.subscribeToWindowService();
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  private manageUserData(): void {
    this.storeService.select('user').subscribe({
      next: (user: UserClient) => {
        this.user = user;
        this.getUserDegrees();
      },
      complete: () => {
        this.userService.validateUser().subscribe({
          next: (user: UserClient) => {
            this.storeService.set('user', user);
            this.user = user;
            this.getUserDegrees();
          },
          error: (err : ApplicationErrorModel) => {
            console.log(err);
          }
        });
      }
    });
  }

  private getUserDegrees() {
    this.storeService.select('userDegrees').subscribe({
      next: (userDegrees: UserDegreeClient[]) => {
        this.userDegree = userDegrees[0];
        this.getStudyPlan();
      },
      complete: () => {
        this.degreeService.getUserDegrees(this.user.id).subscribe({
          next: (userDegrees: UserDegreeClient[]) => {
            this.storeService.set('userDegrees', userDegrees);
            this.userDegree = userDegrees[0];
            this.getStudyPlan();
          },
          error: (err : ApplicationErrorModel) => {
            console.log(err);
          }
        });
      }
    });
  }

  private getStudyPlan(): void {
    this.storeService.select('studyPlan').subscribe({
      next: (studyPlan: StudyPlanClient) => {
        this.studyPlan = studyPlan;
      },
      complete: () => {
        this.studyPlanService.getUserStudyPlan(this.userDegree.id).subscribe({
          next: (studyPlan: StudyPlanClient) => {
            this.storeService.set('studyPlan', studyPlan);
            this.studyPlan = studyPlan;
          },
          error: (err : ApplicationErrorModel) => {
            console.log(err);
          }
        });
      }
    });
  }

  public createStudyPlan(): void {
    let studyPlan: StudyPlanClient = new StudyPlanClient();
  
    studyPlan.id = null;
    studyPlan.userDegreeId = this.userDegree.id;
    studyPlan.userDegree = null;
    studyPlan.gradingSystemId = null;
    studyPlan.gradingSystem = null;
    studyPlan.totalCredits = null;
    studyPlan.earnedCredits = null;
    studyPlan.status = null;
  
    this.studyPlanService.createStudyPlan(studyPlan).subscribe({
      next: (studyPlan: StudyPlanClient) => {
        this.storeService.set('studyPlan', studyPlan);
        this.studyPlan = studyPlan;
        this.showCourseDialog();
      },
      error: (err: ApplicationErrorModel) => {
        console.log(err);
      }
    });
  }  

  private showCourseDialog(): void {
    this.courseForm = this.fb.group({
      courses: this.fb.array([
        this.createCourseFormGroup()
      ])
    });   
    this.studyTermForm = this.fb.group({
      studyTermName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
    this.cd.detectChanges();
    this.dialogComponent.show();
  }

  get coursesFormArray(): FormArray {
    if(!this.courseForm) return null;
    return this.courseForm.get('courses') as FormArray;
  }

  public trackByFn(index: number, item: any): number {
    return index;
  }

  addCourse(): void {
    this.coursesFormArray.push(this.createCourseFormGroup());
    this.cd.detectChanges();
  }

  private createCourseFormGroup(): FormGroup {
    return this.fb.group({
      courseName: '',
      courseCredits: ''
    });
  }

  public openDialog() : void {
    this.showCourseDialog();
  }

  public createStudyPlanTermWithCourses(): void {
    // if(!this.coursesFormArray) return;
    // this.coursesFormArray.controls.forEach((courseGroup: FormGroup, index: number) => {
    //   const courseNameValue = courseGroup.get('courseName')?.value;
    //   const courseCreditsValue = courseGroup.get('courseCredits')?.value;
    //   console.log(courseNameValue);
    //   console.log(courseCreditsValue);
    // });
    // console.log(this.studyTermForm);
    let courses : CourseClient[] = [];
    this.createStudyPlanTermObject();
    courses = this.createCourses();
  }

  private createStudyPlanTermObject(): void {
    let studyPlanTerm : StudyPlanTermClient | null =
     this.formService.validateForm(this.studyTermForm, StudyPlanTermClient);
  }

  private createCourses(): CourseClient[] {
    throw new Error('Method not implemented.');
  }

}