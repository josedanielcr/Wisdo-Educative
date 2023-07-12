import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ButtonType } from 'src/app/enums/button.enum';
import { AcademicScheduleEnum } from 'src/app/enums/core/academic.schedule.enum';
import { DegreeTypeEnum } from 'src/app/enums/core/degree.type.enum';
import { StudyFieldEnum } from 'src/app/enums/core/study.field.enum';
import { UserStatus } from 'src/app/enums/core/user.status.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { EnumModel } from 'src/app/models/enum.model';
import { SelectOptionModel } from 'src/app/models/select.option.model';
import { SetUpDegree } from 'src/app/models/utils/setup.degree.model';
import { FormService } from 'src/app/services/components/form.service';
import { SelectService } from 'src/app/services/components/select.service';
import { AuthService } from 'src/app/services/core/auth.service';
import { DegreeService } from 'src/app/services/core/degree.service';
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

  public user : UserClient;

  constructor(private fb : FormBuilder, 
    private formService : FormService,
    private enumService: EnumService,
    private selectService : SelectService,
    private degreeService : DegreeService,
    private authService : AuthService,
    private router : Router) {
    }
    
    
    public ngOnInit(): void {
      this.authService.getUserSubject().subscribe({
        next: (user : UserClient) => {
          if(user.userStatus !== UserStatus.PendingDegree) this.router.navigate(['/workspace']);
          this.user = user;
        }
      });
      this.loadSelectInputs();
      this.createForm();  
  }

  public createForm(): void {
    this.setupDegreFormm = this.fb.group({
      userId : ['', Validators.required],
      degreeName: [{value: '', disabled: false}, Validators.required],
      institutionName: ['', Validators.required],
      schedule: [this.academicSheculeOptions[0].value, Validators.required],
      degreeType: [this.degreeTypeOptions[0].value, Validators.required],
      studyField : [this.studyFieldOptions[0].value, Validators.required],
      startYear: [null, Validators.required],
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
    this.setupDegreFormm.controls['userId'].setValue(this.user.id);
    const setupDegreeData : SetUpDegree | null = 
      this.formService.validateForm(this.setupDegreFormm, SetUpDegree);
    if(!setupDegreeData) {
      alert('Invalid form data');
      return;
    }
    this.executeSubmitEvent(setupDegreeData);
  }

  private executeSubmitEvent(setupDegreeData: SetUpDegree): void {
    this.degreeService.setUserDegree(setupDegreeData).subscribe({
      next : (userDegree : UserDegreeClient) => {
        console.log(userDegree);
      },
      error : (error : ApplicationErrorModel) => {
        alert(error);
      }
    });
  }
}