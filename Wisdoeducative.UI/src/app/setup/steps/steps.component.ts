import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concat, toArray } from 'rxjs';
import { ChipsContainerComponent } from 'src/app/components/chips-container/chips-container.component';
import { ButtonType } from 'src/app/enums/button.enum';
import { AcademicScheduleEnum } from 'src/app/enums/core/academic.schedule.enum';
import { DegreeTypeEnum } from 'src/app/enums/core/degree.type.enum';
import { StudyFieldEnum } from 'src/app/enums/core/study.field.enum';
import { UserCategoryEnum } from 'src/app/enums/core/user.category.enum';
import { ApplicationErrorModel } from 'src/app/models/application.error.model';
import { ChipModel } from 'src/app/models/chip.model';
import { InstitutionClient } from 'src/app/models/core/client/institution.client.model';
import { InterestClient } from 'src/app/models/core/client/interest.client.model';
import { UserClient } from 'src/app/models/core/client/user.client.model';
import { UserDegreeClient } from 'src/app/models/core/client/user.degree.client.model';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { SelectOptionModel } from 'src/app/models/select.option.model';
import { SetUpDegree } from 'src/app/models/utils/setup.degree.model';
import { SetUpUser } from 'src/app/models/utils/setup.user.model';
import { SetUpUserServer } from 'src/app/models/utils/setup.user.sever.model';
import { ChipsContainerService } from 'src/app/services/components/chips-container.service';
import { FormService } from 'src/app/services/components/form.service';
import { SelectService } from 'src/app/services/components/select.service';
import { EnumService } from 'src/app/services/core/enum.service';
import { InstitutionService } from 'src/app/services/core/models/institution.service';
import { InterestService } from 'src/app/services/core/models/interest.service';
import { UserService } from 'src/app/services/core/models/user.service';
import { StoreService } from 'src/app/services/core/store.service';
import { WindowResizeService } from 'src/app/services/helpers/window-resize.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit{

  //containers
  @ViewChild('chipsContainer') chipsContainer : ChipsContainerComponent;

  //util
  public steps : number[] = [1,2,3,4];
  public currentStep : number = 1;
  public isPhone : boolean;
  public isTablet : boolean;
  public isDesktop : boolean;
  public loading : boolean = true;
  public ButtonType = ButtonType;
  private user : UserClient;
  public notEnoughInterestsError : boolean = false;
  
  //options
  public academicSheculeOptions : SelectOptionModel[];
  public degreeTypeOptions : SelectOptionModel[];
  public studyFieldOptions : SelectOptionModel[];
  public userCategoryOptions : SelectOptionModel[];
  public institutions : InstitutionClient[] = [];
  
  //forms
  public userSetupForm : FormGroup;
  public setupDegreForm : FormGroup;

  //data
  public chips : ChipModel[] = [];
  public interests : InterestClient[] = [];
  public selectedInterests : InterestClient[] = [];
  public selectedChips : ChipModel[] = [];
  public userDegreeSetupData : SetUpDegree;

  constructor(private resizeService : WindowResizeService, 
              private fb : FormBuilder, 
              private storeService : StoreService,
              private enumService : EnumService,
              private selectService : SelectService,
              private formService : FormService,
              private userService : UserService,
              private chipsContainerService : ChipsContainerService,
              private interestsService : InterestService,
              private router : Router,
              private institutionService : InstitutionService) {}
              
  ngOnInit(): void {
    this.createUserForm();
    this.manangeUserState();
    this.loadSelectOptions();
    this.manageScreenSize();
    this.handleChipsContainerService();
    this.loadInterests();
    this.loadSelectInputs();
    this.createUserDegreeForm();
  }

  private manangeUserState(): void {
    this.storeService.select('user').subscribe({
      next: (user: UserClient) => {
        this.user = user;
        this.loadUserDataForm();
        this.loading = false;
      },
      complete : () => {
        this.userService.validateUser().subscribe({
          next: (user: UserClient) => {
            this.storeService.set('user', user);
            this.user = user;
            this.loadUserDataForm();
            this.loading = false;
          }
        });
      }
    });
  }

  private handleChipsContainerService(): void {
    this.chipsContainerService.getVariableSubject().subscribe((chips : ChipModel[]) => {
      if(chips && chips.length > 0 && chips.length <= 4){
        this.selectedChips = chips;
        if(chips.length >= 4) this.notEnoughInterestsError = false;
      }
    });
  }

  private loadInterests(): void {
    this.interestsService.getInterests().subscribe({
      next: (interests : InterestClient[]) => {
        if(interests && interests.length > 0){
          this.interests = interests;
          this.chips = interests.map((interest : InterestClient) => {
            return new ChipModel(interest.id, interest.name, false);
          });
        }
      },
      error: (error : ApplicationErrorModel) => {
        alert(error.message);
      }
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

  public next(): void {
    this.currentStep++;
  }

  private manageScreenSize() {
    this.resizeService.getScreenSizeObservable().subscribe((resizeData : ScreenSizeModel) => {
      this.isPhone = resizeData.isPhone;
      this.isTablet = resizeData.isTablet;
      this.isDesktop = resizeData.isDesktop;
    });
  }

  private createUserForm(): void {
    this.userSetupForm = this.fb.group({
      firstName: ['Loading...', [Validators.required]],
      lastName: ['Loading...', [Validators.required]],
      dateOfBirth: [null, [ Validators.required]],
      category : [null, [Validators.required]]
    });
  }

  private loadUserDataForm() {
     this.userSetupForm.patchValue({
      firstName: this.user.name,
      lastName: this.user.lastName,
      dateOfBirth: null,
      category: null
    });
  }

  private loadSelectOptions(): void {
    this.userCategoryOptions = this.getUserCategoryNames(
      this.selectService.transformObjectToSelectOptions(
        this.enumService.getEnumValues(UserCategoryEnum),null,null));
    this.institutionService.getInstitutions().subscribe({
      next: (institutions : InstitutionClient[]) => {
        this.institutions = institutions;
      }
    });
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

  public submitUserData(): void {
    const setupUserData : SetUpUser | null = 
      this.formService.validateForm(this.userSetupForm, SetUpUser);
    if(!setupUserData) return;
    this.saveUserDetails(setupUserData);
    this.next();
  }

  private saveUserDetails(userData: SetUpUser): void {
    this.user.name = userData.firstName;
    this.user.lastName = userData.lastName;
    this.user.dateOfBirth = userData.dateOfBirth;
    this.user.category = userData.category;
    this.user.role = null;
  }

  public submitInterests(): void {
    this.notEnoughInterestsError = false;
    if(this.selectedChips.length < 4){
      this.notEnoughInterestsError = true;
      return;
    } 
    this.next();
    this.setupUserInterests();
  }

  private setupUserInterests(): void {
    this.selectedInterests = this.parseChipToInterestClient();
  }

  private parseChipToInterestClient(): InterestClient[] {
    return this.interests.filter((interest : InterestClient) => {
      return this.selectedChips.some((chip : ChipModel) => {
        return chip.id === interest.id;
      });
    });
  }

  private createUserDegreeForm(): void {
    this.setupDegreForm = this.fb.group({
      userId : ['', Validators.required],
      degreeName: [{value: '', disabled: false}, Validators.required],
      institutionName: ['', Validators.required],
      schedule: [null, Validators.required],
      degreeType: [null, Validators.required],
      studyField : [null, Validators.required],
      startYear: [null, Validators.required],
    });  
  }

  public submitUserDegree(): void {
    this.setupDegreForm.controls['userId'].setValue(this.user.id);
    const setupDegreeData : SetUpDegree | null = 
      this.formService.validateForm(this.setupDegreForm, SetUpDegree);
    if(!setupDegreeData) return;
    this.next();
    this.userDegreeSetupData = setupDegreeData;
    this.executeUserSetup();
  }

  private executeUserSetup(): void {
    let userSetupData : SetUpUserServer = new SetUpUserServer();
    userSetupData.user = this.user;
    userSetupData.interestsDtos = this.selectedInterests;
    userSetupData.userDegreConfig = this.userDegreeSetupData;

    this.userService.setUserDetails(userSetupData).subscribe({
      next: (user : UserClient) => {
        this.storeService.set('user', user);
        this.router.navigate(['/workspace']);
      },
      error: (error : ApplicationErrorModel) => {
        alert(error);
        setTimeout(() => {
          window.location.reload();
        },2000);
      }
    });
  }
}