import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './auth-guard.service';
import {HomeComponent} from './home/home.component';
import {TeamDetailsComponent} from './team-details/team-details.component';
import {TeamInfoComponent} from './team-info/team-info.component';
import {TeamAchievementComponent} from './team-achievement/team-achievement.component';
import {TeamAchievementCreateComponent} from './team-achievement-create/team-achievement-create.component';
import {TeamPositionComponent} from './team-position/team-position.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'teams/:id',
        component: TeamDetailsComponent
      },
      {
        path: 'teams/:id/info',
        component: TeamInfoComponent
      },
      {
        path: 'teams/:id/position',
        component: TeamPositionComponent
      },
      {
        path: 'teams/:id/achievement',
        component: TeamAchievementComponent
      },
      {
        path: 'teams/:id/achievement/create',
        component: TeamAchievementCreateComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
