import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerRoutingModule} from './manager-routing.module';
import {NbActionsModule, NbCardModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbSidebarService, NbUserModule} from '@nebular/theme';
import {HomeComponent} from './home/home.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './layout/header/header.component';
import {UserService} from './data/user.service';
import {TeamsService} from './data/teams.service';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamAchievementComponent } from './team-achievement/team-achievement.component';
import { TeamAchievementCreateComponent } from './team-achievement-create/team-achievement-create.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import {AchievementsService} from './data/achievements.service';
import { TeamPositionComponent } from './team-position/team-position.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';


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
    ManagerRoutingModule,
    Ng2SmartTableModule,
    LeafletModule.forRoot(),
  ],
  providers: [
    NbSidebarService,
    UserService,
    TeamsService,
    AchievementsService,
    ...NbMenuModule.forRoot().providers,
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    TeamDetailsComponent,
    TeamAchievementComponent,
    TeamAchievementCreateComponent,
    TeamInfoComponent,
    TeamPositionComponent
  ]
})
export class ManagerModule {
}
