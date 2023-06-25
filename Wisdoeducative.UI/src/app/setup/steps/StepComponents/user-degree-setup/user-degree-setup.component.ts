import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ButtonType } from 'src/app/enums/button.enum';
import { AcademicScheduleEnum } from 'src/app/enums/core/academic.schedule.enum';
import { DegreeTypeEnum } from 'src/app/enums/core/degree.type.enum';
import { StudyFieldEnum } from 'src/app/enums/core/study.field.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { EnumModel } from 'src/app/models/enum.model';
import { SelectOptionModel } from 'src/app/models/select.option.model';
import { SetUpDegree } from 'src/app/models/utils/setupDegree.model';
import { FormService } from 'src/app/services/components/form.service';
import { SelectService } from 'src/app/services/components/select.service';
import { EnumService } from 'src/app/services/core/enum.service';

@Component({
  selector: 'app-user-degree-setup',
  templateUrl: './user-degree-setup.component.html',
  styleUrls: ['./user-degree-setup.component.css']
})
export class UserDegreeSetupComponent implements OnInit{

  @Output() event : EventEmitter<any> = new EventEmitter<any>();

  public setupDegreFormm : FormGroup;
  public ButtonType = ButtonType;

  public academicSheculeOptions : SelectOptionModel[];
  public degreeTypeOptions : SelectOptionModel[];
  public studyFieldOptions : SelectOptionModel[];

  constructor(private fb : FormBuilder, 
    private formService : FormService,
    private enumService: EnumService,
    private selectService : SelectService) {}

  public ngOnInit(): void {
    this.createForm();  
    this.loadSelectInputs();
  }

  public createForm(): void {
    this.setupDegreFormm = this.fb.group({
      degreeName: ['', Validators.required],
      institution: ['', Validators.required],
      schedule: ['', Validators.required],
      degreeType: ['', Validators.required],
      field : ['', Validators.required],
      startYear: [new Date(), Validators.required],
    });  
  }

  private loadSelectInputs(): void {
    this.academicSheculeOptions = this.selectService
      .transformObjectToSelectOptions(this.enumService.getEnumValues(AcademicScheduleEnum),null,null);
    this.degreeTypeOptions = this.selectService.transformObjectToSelectOptions(
      this.enumService.getEnumValues(DegreeTypeEnum),null,null);
    this.studyFieldOptions = this.selectService.transformObjectToSelectOptions(
      this.enumService.getEnumValues(StudyFieldEnum),null,null);
  }

  public submit(): void {
    const setupDegreeData : SetUpDegree | null = 
      this.formService.validateForm(this.setupDegreFormm, SetUpDegree);
    if(!setupDegreeData) alert('Invalid form data');
  }
}