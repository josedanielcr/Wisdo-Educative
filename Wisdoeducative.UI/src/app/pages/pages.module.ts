import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    WorkspaceComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
