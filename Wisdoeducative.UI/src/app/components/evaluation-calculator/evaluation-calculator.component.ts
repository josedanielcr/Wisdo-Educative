import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonType } from 'src/app/enums/button.enum';
import { CourseClient } from 'src/app/models/core/client/course.client.model';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseEvaluationClient } from 'src/app/models/core/client/course.evaluation.client.model';
import { FormService } from 'src/app/services/components/form.service';
import { CourseEvaluationService } from 'src/app/services/core/models/course-evaluation.service';
import { Subscription } from 'rxjs';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { MessageService } from 'src/app/services/core/message.service';
import { MessageModel } from 'src/app/models/message.model';
import { MessageTypeEnum } from 'src/app/enums/message.type.enum';
import { CourseEvaluationTaskClient } from 'src/app/models/core/client/course.evaluation.task.client.model';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';


interface EvaluationRow {
  evaluation : CourseEvaluationClient;
  totalScore : string;
  isOpen : boolean;
  tasks : CourseEvaluationTaskClient[];
}

@Component({
  selector: 'app-evaluation-calculator',
  templateUrl: './evaluation-calculator.component.html',
  styleUrls: ['./evaluation-calculator.component.css']
})
export class EvaluationCalculatorComponent implements OnInit, OnDestroy {

  @Input() course : CourseClient;
  @ViewChild(DialogComponent) dialog: DialogComponent;
  @ViewChild('courseEvaluationTaskDialog') courseEvaluationTaskDialog: DialogComponent;

  //util
  public ButtonType = ButtonType;
  public subscriptions : Subscription[] = [];
  public evaluationRows : EvaluationRow[] = [];
  public selectedEvaluationRow : EvaluationRow | null = null;

  public isDesktop: boolean;
  public isTablet: boolean;
  public isPhone: boolean;

  //properties
  public evaluations : CourseEvaluationClient[] = [];
  
  //forms
  public evaluationForm : FormGroup;
  public evaluationTaskForm : FormGroup;

  constructor(private fb : FormBuilder,
    private formService : FormService,
    private courseEvalutationService : CourseEvaluationService,
    private messageService : MessageService,
    private windowService : WindowResizeService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  
  ngOnInit(): void {
    this.initiateForms();
    this.getCourseEvaluations();
    this.subscribeToWindowService();
  }

  private subscribeToWindowService() {
    this.windowService.getScreenSizeObservable().subscribe((screenSizes: ScreenSizeModel) => {
      this.isDesktop = screenSizes.isDesktop;
      this.isTablet = screenSizes.isTablet;
      this.isPhone = screenSizes.isPhone;
    });
  }

  private initiateForms(): void {
    this.evaluationForm = this.fb.group({
      name : ['', Validators.required],
      weight : [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.evaluationTaskForm = this.fb.group({
      name : ['', Validators.required],
      weight : [0, [Validators.required]],
      startDate : ['', Validators.required],
      endDate : ['', Validators.required]
    });
  }

  private getCourseEvaluations() {
    this.subscriptions.push(
      this.courseEvalutationService.getCourseEvaluations(this.course.id).subscribe({
        next : (courseEvaluations : CourseEvaluationClient[]) => {
          this.evaluations = courseEvaluations;
          this.evaluations.forEach(evaluation => {
            this.evaluationRows.push({
              evaluation : evaluation,
              totalScore : this.getEvaluationTasksWeight(evaluation.tasks),
              isOpen : false,
              tasks : evaluation.tasks
            });
          });
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode))
        }
      })
    );
  }

  private getEvaluationTasksWeight(tasks: CourseEvaluationTaskClient[]): string {
    let weight : number = 0;
    tasks.forEach((task : CourseEvaluationTaskClient) => {
      weight += task.totalScore;
    });
    return weight.toString();
  }

  public addEvaluation(): void {
    this.dialog.show();
  }

  public openEvaluationRow(evaluationRow : EvaluationRow): void {
    evaluationRow.isOpen = !evaluationRow.isOpen;
  }

  public openAddCourseEvaluationTask(evaluationRow : EvaluationRow): void {
    this.selectedEvaluationRow = evaluationRow;
    this.courseEvaluationTaskDialog.show();
  }

  public createEvaluationTask(): void {
    let evaluationTask : CourseEvaluationTaskClient | null =
    this.formService.validateForm(this.evaluationTaskForm, CourseEvaluationTaskClient);
    if(!evaluationTask) return null;
    this.executeCreateEvaluationTask(evaluationTask);
  }

  private executeCreateEvaluationTask(evaluationTask: CourseEvaluationTaskClient): void {
    evaluationTask.courseEvaluationId = this.selectedEvaluationRow.evaluation.id;
    this.subscriptions.push(
      this.courseEvalutationService.createCourseEvaluationTask(evaluationTask.courseEvaluationId, evaluationTask).subscribe({
        next : (courseEvaluationTaskClient : CourseEvaluationTaskClient) => {
          this.selectedEvaluationRow.tasks.push(courseEvaluationTaskClient);
          this.messageService.show(new MessageModel(MessageTypeEnum.Success, 
            'Success', 'CourseEvaluationTaskCreation'));
            this.courseEvaluationTaskDialog.hide();
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode))
        }
      })
    );
  }

  public createEvalution(): void {
    let evaluation : CourseEvaluationClient | null =
    this.formService.validateForm(this.evaluationForm, CourseEvaluationClient);
    if(!evaluation) return null;
    this.executeCreateEvaluation(evaluation);
    
  }

  private executeCreateEvaluation(evaluation: CourseEvaluationClient) {
    evaluation.description = '';
    evaluation.courseId = this.course.id;
    this.subscriptions.push(
      this.courseEvalutationService.createCourseEvaluation(this.course.id, evaluation).subscribe({
        next : (courseEvaluationClient : CourseEvaluationClient) => {
          this.evaluations.push(courseEvaluationClient);
          this.evaluationRows.push({
            evaluation : courseEvaluationClient,
            totalScore : '0',
            isOpen : false,
            tasks : []
          });
          this.messageService.show(new MessageModel(MessageTypeEnum.Success, 
            'Success', 'CourseEvaluationCreation'));
          this.dialog.hide();
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode))
        }
      })
    );
  }
}
