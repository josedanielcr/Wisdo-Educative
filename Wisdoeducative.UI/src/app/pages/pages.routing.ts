//angular components
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MsalGuard } from '@azure/msal-angular';
import { WorkspaceComponent } from './workspace.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
      path : 'workspace',
      component : WorkspaceComponent,
      canActivate: [MsalGuard],
      children  : [
        { path: '', component: HomeComponent }, 
      ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}