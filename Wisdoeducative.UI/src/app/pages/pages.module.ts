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
import { NgChartsModule } from 'ng2-charts';
import { CourseEvaluationTasksComponent } from './course-evaluation-tasks/course-evaluation-tasks.component';
import { ProfileComponent } from './profile/profile.component';
import {PipesModule} from "../pipes/pipes.module";


@NgModule({
  declarations: [
    WorkspaceComponent,
    HomeComponent,
    NewStudyPlanComponent,
    StudyPlanComponent,
    CourseComponent,
    CourseEvaluationTasksComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    TranslocoRootModule,
    NgChartsModule,
    PipesModule
  ]
})
export class PagesModule { }
