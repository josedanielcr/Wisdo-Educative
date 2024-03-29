import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { MessageModel } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/core/message.service';
import { CourseEvaluationService } from 'src/app/services/core/models/course-evaluation.service';
import { BaseInput } from '../base-input';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-course-task-select',
  templateUrl: './course-task-select.component.html',
  styleUrls: ['./course-task-select.component.css', '../base-input-styles.css'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CourseTaskSelectComponent),
        multi: true
    }
  ]
})
export class CourseTaskSelectComponent extends BaseInput implements AfterViewInit, OnInit {

  public ngControl : NgControl;
  @Input() course: CourseClient;
  @Input() label : string;
  @Input() override value : any;
  @Input() error : string = '';
  @Input() tasks : CourseEvaluationTaskClient[];
  @Input() isFilter : boolean = false;
  @Output() valueChange : EventEmitter<string> = new EventEmitter<string>();
  public filteredTasks : CourseEvaluationTaskClient[] = [];
  public dropdownOpen: boolean = false;
  public isActive : boolean = false;

  //util
  private subscriptions : Subscription[] = [];

  constructor(private injector : Injector, 
    private cdf : ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.filteredTasks = this.tasks;
  }

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) { 
      this.ngControl.valueAccessor = this;
      this.cdf.detectChanges();
    }
  }

  override updateValue(event: Event): void {
    super.updateValue(event);
    let search : string = (event.target as HTMLInputElement).value;
    this.filteredTasks = this.tasks
      .filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }

  public setToInput(taskName : string): void {
    this.value = taskName;
    if(this.isFilter) this.manageFilterSelection();
    super.updateAndNotify(this.value);
    this.closeDropdown();
  }

  public clearFilters(): void {
    if(!this.isFilter) return;
    this.value = '';
    this.filteredTasks = this.tasks;
    super.updateAndNotify(this.value);
    this.valueChange.emit(this.value);
    this.isActive = false;
  }

  private manageFilterSelection(): void {
    this.valueChange.emit(this.value);
    this.isActive = true;
  }

  public openDropdown() {
    this.dropdownOpen = true;
  }

  public closeDropdown() {
    this.dropdownOpen = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
