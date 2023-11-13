import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { CourseSearchModel } from 'src/app/models/utils/course.search.model';
import { CourseService } from 'src/app/services/core/models/course.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

interface CourseStatus {
  value: string;
}


@Component({
  selector: 'app-study-plan-filters',
  templateUrl: './study-plan-filters.component.html',
  styleUrls: ['./study-plan-filters.component.css']
})
export class StudyPlanFiltersComponent implements OnInit {

  //properties
  @Output() public isCardViewEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public isSearchActiveEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public coursesEmitter : EventEmitter<CourseClient[]> = new EventEmitter<CourseClient[]>();
  @Input() public studyPlanId : number;

  //forms
  public filterForm : FormGroup;
  public courseNameForm : FormGroup;

  //util
  public isDesktop: boolean = false;
  public isTablet: boolean = false;
  public isPhone: boolean = false;
  public isCardView : boolean = true;
  public isFilterWindowOpen : boolean = false;
  public arePhoneFiltersOpen : boolean = false;
  public isSearchActive : boolean = false;

  //constants
  public readonly courseStatuses : CourseStatus[] = [
    {value: 'NotStarted'},
    {value: 'InProgress'},
    {value: 'Finished'}
  ];

  constructor(private windowService : WindowResizeService,
    private fb : FormBuilder,
    private courseService : CourseService) { }

  public ngOnInit(): void {
    this.subscribeToWindowService();
    this.createForms();
  }

  private createForms(): void {
    this.filterForm = this.fb.group({
      isFavorite: [false],
      status : new FormArray(this.courseStatuses.map(status => this.fb.control(false)))
    });
    this.courseNameForm = this.fb.group({
      name : ['']
    });
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;

      this.isPhone = screenSizes.isPhone;
    });
  }

  public changeView() {
    this.isCardView = !this.isCardView;
    this.isCardViewEmitter.emit(this.isCardView);
  }

  public toggleFilterWindow() {
    this.isFilterWindowOpen = !this.isFilterWindowOpen;
  }

  public search(): void {
    let courseSearchModel : CourseSearchModel = this.createCourseModel();
    this.executeSearch(this.studyPlanId, courseSearchModel);
    this.isSearchActive = true;
    this.isSearchActiveEmitter.emit(this.isSearchActive);
  }

  private executeSearch(studyPlanId, courseSearchModel : CourseSearchModel) {
    this.courseService.searchCouse(studyPlanId, courseSearchModel).subscribe({
      next : (courses) => {
        this.coursesEmitter.emit(courses);
        this.isFilterWindowOpen = false;
        this.arePhoneFiltersOpen = false;
      },
      error : (err : ApplicationErrorModel) => {
        console.log(err);
      }
    });
  }

  private parseSelectedStatuses(values: boolean[]) {
    let selectedStatuses : string[] = [];
    values.forEach((value, index) => {
      if(value) selectedStatuses.push(this.courseStatuses[index].value);
    });
    return selectedStatuses;
  }

  public togglePhoneFilters() {
    this.arePhoneFiltersOpen = !this.arePhoneFiltersOpen;
  }

  public clearFilters() {
    this.cleanFilterForm();
    this.cleanCourseNameForm();
    this.isSearchActive = false;
    this.isSearchActiveEmitter.emit(this.isSearchActive);
  }

  public getIconSize() : number{
    return (this.isDesktop || this.isTablet) ? 30 : 25;
  }

  private createCourseModel(): CourseSearchModel {
    let courseSearchModel : CourseSearchModel = new CourseSearchModel();
    courseSearchModel.isFavorite = this.filterForm.value.isFavorite;
    courseSearchModel.name = this.courseNameForm.value.name;
    courseSearchModel.Statuses = this.parseSelectedStatuses(this.filterForm.value.status);
    return courseSearchModel;
  }

  private cleanFilterForm(): void {
    this.filterForm.get('isFavorite').setValue(false);
    this.filterForm.get('status').setValue([false, false, false]);
  }

  private cleanCourseNameForm(): void {
    this.courseNameForm.get('name').setValue('');
  }
}
