import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';
import {NbCheckboxComponent, NbLayoutModule, NbSidebarModule, NbSidebarService, NbThemeModule} from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NbLoginComponent } from './auth/login/login.component';
import { NbLogoutComponent } from './auth/logout/logout.component';
import {INSAExpressAuthService} from './auth/insaexpress-auth.service';
import {AuthModule} from './auth/auth.module';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';


export function tokenGetter() {
  return localStorage.getItem('auth_app_token');
}

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    NbLoginComponent,
    NbLogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: INSAExpressAuthService,
          config: {},
        },
      },
      forms: {},
    }),
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'JWT ',
        whitelistedDomains: environment.JWTDomains
      }
    })

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }, NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
