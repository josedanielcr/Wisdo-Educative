//angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//sections
import { PagesRoutingModule } from './pages/pages.routing';
import { NotFoundComponent } from './not-found/not-found.component';
import { SetupComponent } from './setup/setup.component';
import { MsalGuard } from '@azure/msal-angular';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'setup', component: SetupComponent, canActivate: [MsalGuard] },
  { path: '', redirectTo: '/workspace', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' }),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }