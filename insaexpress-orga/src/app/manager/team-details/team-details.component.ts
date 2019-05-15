import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterState} from '@angular/router';
import {Team, TeamAchievement, TeamsService} from '../data/teams.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {
  team: Team;
  team_achievements: TeamAchievement[];

  constructor(
    private routerParams: ActivatedRoute,
    private teamsService: TeamsService) { }

  ngOnInit() {
    this.routerParams.params.subscribe(
      (params) => {
        this.teamsService.getTeam(params['id']).subscribe(
          (team) => {
            this.team = team;
            this.team_achievements = team.team_achievements.reverse();
          }
        );
      }
    );
  }

}
