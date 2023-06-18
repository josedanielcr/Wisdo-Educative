import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WizardComponent } from './wizard/wizard.component';



@NgModule({
  declarations: [
    ButtonComponent,
    WizardComponent
  ],
  exports: [
    ButtonComponent,
    WizardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
