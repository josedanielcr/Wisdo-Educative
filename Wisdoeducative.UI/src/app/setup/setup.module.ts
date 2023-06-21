import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import { StepsComponent } from './steps/steps.component';
import { ComponentsModule } from '../components/components.module';
import { UserSetupComponent } from './steps/StepComponents/user-setup/user-setup.component';
import { UserDegreeSetupComponent } from './steps/StepComponents/user-degree-setup/user-degree-setup.component';
import { UserInterestsSetupComponent } from './steps/StepComponents/user-interests-setup/user-interests-setup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SetupComponent,
    StepsComponent,
    UserSetupComponent,
    UserDegreeSetupComponent,
    UserInterestsSetupComponent
  ],
  exports: [
    SetupComponent,
    StepsComponent,
    UserSetupComponent,
    UserDegreeSetupComponent,
    UserInterestsSetupComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SetupModule { }