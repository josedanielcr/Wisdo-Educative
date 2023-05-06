//angular components
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MsalGuard } from '@azure/msal-angular';
import { WorkspaceComponent } from './workspace.component';

const routes: Routes = [
  {
      path : 'workspace',
      component : WorkspaceComponent,
      canActivate: [MsalGuard],
      children  : [
        // { path: '/:workspaceId',component: HomeComponent }, 
      ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}