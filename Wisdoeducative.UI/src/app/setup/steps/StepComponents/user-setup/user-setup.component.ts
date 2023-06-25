import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from 'src/app/enums/button.enum';
import { UserCategoryEnum } from 'src/app/enums/core/user.category.enum';
import { WizardStepDirection } from 'src/app/enums/wizard.enum';
import { SelectOptionModel } from 'src/app/models/select.option.model';
import { SelectService } from 'src/app/services/components/select.service';
import { EnumService } from 'src/app/services/core/enum.service';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit{

  @Output() event = new EventEmitter<any>();
  public userSetupForm : FormGroup;
  public ButtonType = ButtonType;
  public userCategoryOptions : SelectOptionModel[];

  constructor(private fb : FormBuilder, 
    private enumService : EnumService,
    private selectService : SelectService) { }

  public ngOnInit(): void {
    this.createForm();
    this.loadSelectOptions();
  }

  private loadSelectOptions() {
    this.userCategoryOptions = this.getUserCategoryNames(
      this.selectService.transformObjectToSelectOptions(
        this.enumService.getEnumValues(UserCategoryEnum),null,null));
  }

  private createForm(): void {
    this.userSetupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: [new Date(), [Validators.required]],
      category : ['', [Validators.required]]
    });
  }

  public sendMessageToParent() {
      this.event.emit(WizardStepDirection.NEXT);
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
}