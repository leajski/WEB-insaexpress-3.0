import * as moment from 'moment';
import 'moment/min/locales';

moment.locale('fr-fr');

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicRoutingModule} from './public-routing.module';
import {NbActionsModule, NbCardModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbSidebarService, NbUserModule} from '@nebular/theme';
import {HomeComponent} from './home/home.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './layout/header/header.component';
import {UserService} from './data/user.service';
import {TeamsService} from './data/teams.service';
import { TeamDetailsComponent } from './team-details/team-details.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {TeamsPositionComponent} from './teams-position/teams-positions.component';
import {HttpClientModule} from '@angular/common/http';
import {MomentModule} from 'angular2-moment';


import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NbActionsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbCardModule,
    NbUserModule,
    HttpClientModule,
    PublicRoutingModule,
    Ng2SmartTableModule,
    LeafletModule.forRoot(),
    MomentModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  providers: [
    NbSidebarService,
    UserService,
    TeamsService,
    ...NbMenuModule.forRoot().providers
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    TeamDetailsComponent,
    TeamsPositionComponent
  ]
})
export class PublicModule {
}
