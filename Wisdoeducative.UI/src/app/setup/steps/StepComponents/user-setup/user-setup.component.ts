import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from 'src/app/enums/button.enum';
import { UserCategoryEnum } from 'src/app/enums/core/user.category.enum';
import { UserStatus } from 'src/app/enums/core/user.status.enum';
import { WizardStepDirection } from 'src/app/enums/wizard.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { SelectOptionModel } from 'src/app/models/select.option.model';
import { SetUpUser } from 'src/app/models/utils/setup.user.model';
import { FormService } from 'src/app/services/components/form.service';
import { SelectService } from 'src/app/services/components/select.service';
import { AuthService } from 'src/app/services/core/auth.service';
import { EnumService } from 'src/app/services/core/enum.service';
import { UserService } from 'src/app/services/core/user.service';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit{

  @Output() event = new EventEmitter<any>();
  public loading : boolean = true;
  public userSetupForm : FormGroup;
  public ButtonType = ButtonType;
  public userCategoryOptions : SelectOptionModel[];
  private user : UserClient;

  constructor(private fb : FormBuilder, 
    private enumService : EnumService,
    private selectService : SelectService,
    private formService : FormService,
    private authService : AuthService,
    private userService : UserService) { }

  public ngOnInit(): void {
    this.createForm();
    this.setComponentData();
  }

  private createForm(): void {
    this.userSetupForm = this.fb.group({
      firstName: ['Loading...', [Validators.required]],
      lastName: ['Loading...', [Validators.required]],
      dateOfBirth: [new Date(), [Validators.required]],
      category : ['', [Validators.required]]
    });
  }

  private setComponentData(): void {
    this.authService.getUserSubject().subscribe({
      next: (user : UserClient) => {
        this.user = user;
        this.preValidations();
        this.loadFormData();
        this.loadSelectOptions();
        this.loading = false;
      },
      error: (error : ApplicationErrorModel) => {
        alert(error);
        this.loading = false;
      }
    });
  }

  private preValidations() {
    if(this.user.userStatus !== UserStatus.PendingData){
      this.event.emit(WizardStepDirection.NEXT);
    }
  }

  private loadFormData() { 
    this.userSetupForm.patchValue({
      firstName: this.user.name,
      lastName: this.user.lastName,
      dateOfBirth: new Date(),
      category: ''
    });
  }
  
  private loadSelectOptions() {
    this.userCategoryOptions = this.getUserCategoryNames(
      this.selectService.transformObjectToSelectOptions(
        this.enumService.getEnumValues(UserCategoryEnum),null,null));
  }
  
  private getUserCategoryNames(userCategories : SelectOptionModel[]) : SelectOptionModel[] {
    return userCategories.map((category : SelectOptionModel) => {
      const name = category.name;
      const spacedString = name.replace(/([A-Z])/g, ' $1');
      spacedString.charAt(0).toUpperCase() + spacedString.slice(1).toLowerCase();
      category.name = spacedString;
      return category;
    });
  }

  public submit() {
    const setupDegreeData : SetUpUser | null = 
    this.formService.validateForm(this.userSetupForm, SetUpUser);
    if(!setupDegreeData) {
      alert('Invalid form data');
      return;
    }
    this.saveUserDetails(setupDegreeData);
  }

  saveUserDetails(setupDegreeData: SetUpUser): void {
    this.user.name = setupDegreeData.firstName;
    this.user.lastName = setupDegreeData.lastName;
    this.user.dateOfBirth = setupDegreeData.dateOfBirth;
    this.user.category = setupDegreeData.category;
    this.user.role = null;

    this.userService.setUserDetails(this.user).subscribe({
      next: (user : UserClient) => {
        this.authService.setUserSubject(user);
        this.event.emit(WizardStepDirection.NEXT);
      },
      error: (error : ApplicationErrorModel) => {
        alert(error);
      }
    });
  }

}