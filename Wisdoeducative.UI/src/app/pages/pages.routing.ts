//angular components
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
      path      : 'home',
    //   component : PagesComponent,
      //canActivate: [AuthGuard],
      children  : [
    //    { path: '',component: HomeComponent }, 
    //    { path: 'myProjects',component: ProjectsComponent }, 
      ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}