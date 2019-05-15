import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {INSAExpressAuthService, INSAExpressTokenService} from './insaexpress-auth.service';
import {NB_AUTH_TOKEN_WRAPPER_TOKEN} from '@nebular/auth';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    INSAExpressAuthService,
    { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: INSAExpressTokenService },
  ]
})
export class AuthModule { }
