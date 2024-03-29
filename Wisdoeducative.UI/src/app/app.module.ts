import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

//AD B2C
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, protectedResources } from '../config/azure-ad-b2c.config';

//HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SetupModule } from './setup/setup.module';
import { TranslocoRootModule } from './transloco-root.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    PagesModule,
    PipesModule,
    DirectivesModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    SetupModule,
    MsalModule.forRoot(new PublicClientApplication(msalConfig),
    {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: protectedResources.wisdoeducativeApi.scopes
      }
    },
    {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        [protectedResources.wisdoeducativeApi.endpoint, protectedResources.wisdoeducativeApi.scopes]
      ])
    }),
    TranslocoRootModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }