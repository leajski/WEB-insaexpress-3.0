import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NbLayoutModule, NbSidebarModule, NbSidebarService, NbThemeModule} from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';


export function tokenGetter() {
  return localStorage.getItem('auth_app_token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
