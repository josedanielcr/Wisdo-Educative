import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputTextComponent } from './input/input-text/input-text.component';
import { InputSelectComponent } from './input/input-select/input-select.component';
import { InputDateComponent } from './input/input-date/input-date.component';
import { ChipsContainerComponent } from './chips-container/chips-container.component';
import { ChipComponent } from './chips-container/chip/chip.component';
import { InstitutionSelectComponent } from './input/institution-select/institution-select.component';
import { DialogComponent } from './dialog/dialog.component';
import AddStudyPlanTermComponent from './add-study-plan-term/add-study-plan-term.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ButtonComponent,
    InputTextComponent,
    InputSelectComponent,
    InputDateComponent,
    ChipsContainerComponent,
    ChipComponent,
    InstitutionSelectComponent,
    DialogComponent,
    AddStudyPlanTermComponent
  ],
  exports: [
    ButtonComponent,
    InputTextComponent,
    InputSelectComponent,
    InputDateComponent,
    ChipsContainerComponent,
    InstitutionSelectComponent,
    DialogComponent,
    AddStudyPlanTermComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }