import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewComponent } from './new/new.component';
import { TeamDetaiComponent } from './team-detai/team-detai.component';
import { UploadphotosComponent } from './uploadphotos/uploadphotos.component';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbListModule } from '@nebular/theme';



import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    TeamDetaiComponent,
    UploadphotosComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NoopAnimationsModule,
    LeafletModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbListModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

