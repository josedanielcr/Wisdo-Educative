import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreventEditDirective } from './prevent-edit.directive';

@NgModule({
  declarations: [
    PreventEditDirective
  ],
  exports: [
    PreventEditDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
