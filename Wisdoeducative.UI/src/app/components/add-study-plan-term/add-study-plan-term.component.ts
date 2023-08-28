import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/services/components/form.service';
import { DialogComponent } from '../dialog/dialog.component';
import { StudyPlanTermClient } from 'src/app/models/core/client/study.plan.term.client.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { StudyTermCoursesModel } from 'src/app/models/utils/study.term.courses.model';
import { StudyPlanService } from 'src/app/services/core/models/study-plan.service';
import { StoreService } from 'src/app/services/core/store.service';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';
import { StudyPlanClient } from 'src/app/models/core/client/study.plan.client.model';
import { ButtonType } from 'src/app/enums/button.enum';

@Component({
  selector: 'app-add-study-plan-term',
  templateUrl: './add-study-plan-term.component.html',
  styleUrls: ['./add-study-plan-term.component.css']
})
export default class AddStudyPlanTermComponent implements AfterViewInit {

  @ViewChild(DialogComponent) dialogComponent: DialogComponent;

  //properties
  @Input() studyPlan : StudyPlanClient;
  @Input() studyPlanTerms : StudyPlanTermClient[] = [];
  @Input() isNewStudyPlanInProgress : boolean = false;

  //forms
  public courseForm : FormGroup;
  public studyTermForm : FormGroup;

  //screen
  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;
  public ButtonType = ButtonType;

  constructor(private fb : FormBuilder,
    private formService : FormService,
    private router : Router,
    private studyPlanService : StudyPlanService,
    private storeService : StoreService,
    private windowService : WindowResizeService) { }

  ngOnInit(): void {
    this.subscribeToWindowService();
  }

  ngAfterViewInit(): void {
    this.showCourseDialog();
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  private showCourseDialog(): void {
    this.courseForm = this.fb.group({
      courses: this.fb.array([
        this.createCourseFormGroup()
      ])
    });   
    this.studyTermForm = this.fb.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
    this.dialogComponent.show();
  }

  get coursesFormArray(): FormArray {
    if(!this.courseForm) return null;
    return this.courseForm.get('courses') as FormArray;
  }

  public trackByFn(index: number, item: any): number {
    return index;
  }

  public addCourse(): void {
    this.coursesFormArray.push(this.createCourseFormGroup());
  }

  private createCourseFormGroup(): FormGroup {
    return this.fb.group({
      name: '',
      totalCredits: ''
    });
  }

  public createStudyPlanTermWithCourses(): void {
    const studyPlanTerm : StudyPlanTermClient = this.createStudyPlanTermObject();
    if(!studyPlanTerm) return;
    let courses : CourseClient[] = this.createCourses();
    this.createFullStudyPlanTerm(studyPlanTerm, courses);
  }

  private createStudyPlanTermObject(): StudyPlanTermClient {
    let studyPlanTerm : StudyPlanTermClient | null =
     this.formService.validateForm(this.studyTermForm, StudyPlanTermClient);
    if(!studyPlanTerm) return null;
    return studyPlanTerm;
  }

  private createCourses(): CourseClient[] {
    let courses : CourseClient[] = [];
    if(!this.coursesFormArray) return courses;
    this.coursesFormArray.controls.forEach((courseGroup: FormGroup) => {
      const course : CourseClient = this.formService.validateForm(courseGroup, CourseClient);
      if(!course) return;
      courses.push(course);
    });
    return courses;
  }

  private createFullStudyPlanTerm(studyPlanTerm: StudyPlanTermClient, 
    courses: CourseClient[]): void {

    const studyTermCourses : StudyTermCoursesModel = new StudyTermCoursesModel();
    studyTermCourses.studyPlanTermDto = studyPlanTerm;
    studyTermCourses.coursesDtos = courses;
    studyTermCourses.studyPlanTermDto.studyPlanId = this.studyPlan.id;
    studyTermCourses.studyPlanTermDto.studyTermStatus = 
    this.isNewStudyPlanInProgress ? "InProgress" : "NotStarted";

    this.studyPlanService.createStudyPlanTerm(studyTermCourses).subscribe({
      next: (studyTermCourses: StudyTermCoursesModel) => {
        this.storeService.set(studyTermCourses.studyPlanTermDto.id.toString(), studyTermCourses);
        if(!this.studyPlanTerms) this.studyPlanTerms = [];
        this.studyPlanTerms.push(studyTermCourses.studyPlanTermDto);
        this.dialogComponent.hide();
        this.router.navigate(['/study-plan']);
      }
    });
  }
}