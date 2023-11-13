import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoProfileImagePipe } from './no-profile-image.pipe';



@NgModule({
  declarations: [
    NoProfileImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports : [
    NoProfileImagePipe
  ]
})
export class PipesModule { }
