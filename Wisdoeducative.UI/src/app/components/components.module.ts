import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WizardComponent } from './wizard/wizard.component';
import { InputTextComponent } from './input/input-text/input-text.component';
import { InputSelectComponent } from './input/input-select/input-select.component';
import { InputDateComponent } from './input/input-date/input-date.component';
import { ChipsContainerComponent } from './chips-container/chips-container.component';
import { ChipComponent } from './chips-container/chip/chip.component';



@NgModule({
  declarations: [
    ButtonComponent,
    WizardComponent,
    InputTextComponent,
    InputSelectComponent,
    InputDateComponent,
    ChipsContainerComponent,
    ChipComponent
  ],
  exports: [
    ButtonComponent,
    WizardComponent,
    InputTextComponent,
    InputSelectComponent,
    InputDateComponent,
    ChipsContainerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
