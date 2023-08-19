import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PipesModule } from '../pipes/pipes.module';
import { TitleComponent } from './title/title.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports : [
    SidebarComponent,
    NavbarComponent,
    TitleComponent
  ]
})
export class SharedModule { }
