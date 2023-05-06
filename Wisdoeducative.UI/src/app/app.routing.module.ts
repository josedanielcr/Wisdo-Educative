//angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//sections
import { PagesRoutingModule } from './pages/pages.routing';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
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