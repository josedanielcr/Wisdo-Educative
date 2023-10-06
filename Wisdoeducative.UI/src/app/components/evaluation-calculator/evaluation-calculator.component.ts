import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-evaluation-calculator',
  templateUrl: './evaluation-calculator.component.html',
  styleUrls: ['./evaluation-calculator.component.css']
})
export class EvaluationCalculatorComponent implements OnInit {

  @Input() course : CourseClient;
  @ViewChild(DialogComponent) dialog: DialogComponent;

  //util
  public ButtonType = ButtonType;
  public subscriptions : Subscription[] = [];

  //properties
  public evaluationForm : FormGroup;
  public evaluations : CourseEvaluationClient[] = [];

  constructor(private fb : FormBuilder,
    private formService : FormService,
    private courseEvalutationService : CourseEvaluationService,
    private messageService : MessageService) { }
  
  ngOnInit(): void {
    this.evaluationForm = this.fb.group({
      name : ['', Validators.required],
      weight : [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  public addEvaluation(): void {
    this.dialog.show();
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
          this.messageService.show(new MessageModel(MessageTypeEnum.Success, 
            'Success', 'CourseEvaluationCreation'));
        },
        error : (error : ApplicationErrorModel) => {
          this.messageService.show(new MessageModel(MessageTypeEnum.Error, 'Error', error.errorCode))
        }
      })
    );
  }
}
