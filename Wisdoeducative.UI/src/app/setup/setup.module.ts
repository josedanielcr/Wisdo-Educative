import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import { StepsComponent } from './steps/steps.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  declarations: [
    SetupComponent,
    StepsComponent
  ],
  exports: [
    SetupComponent,
    StepsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoRootModule
  ]
})
export class SetupModule { }