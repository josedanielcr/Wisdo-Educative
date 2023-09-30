import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { NewStudyPlanComponent } from './new-study-plan/new-study-plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudyPlanComponent } from './study-plan/study-plan.component';
import { TranslocoRootModule } from '../transloco-root.module';
import { CourseComponent } from './course/course.component';


@NgModule({
  declarations: [
    WorkspaceComponent,
    HomeComponent,
    NewStudyPlanComponent,
    StudyPlanComponent,
    CourseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    TranslocoRootModule
  ]
})
export class PagesModule { }
