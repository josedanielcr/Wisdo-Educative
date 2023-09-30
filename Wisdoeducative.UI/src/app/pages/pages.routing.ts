//angular components
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MsalGuard } from '@azure/msal-angular';
import { WorkspaceComponent } from './workspace.component';
import { HomeComponent } from './home/home.component';
import { NewStudyPlanComponent } from './new-study-plan/new-study-plan.component';
import { StudyPlanComponent } from './study-plan/study-plan.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {
      path : 'workspace',
      component : WorkspaceComponent,
      canActivate: [MsalGuard],
      children  : [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent }, 
        { path: 'new-study-plan', component: NewStudyPlanComponent },
        { path : 'study-plan', component : StudyPlanComponent },
        { path : 'study-plan/course/:id', component: CourseComponent}
      ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}