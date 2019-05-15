import { Component, OnInit } from '@angular/core';
import {Team, TeamsService} from '../data/teams.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

  team: Team;

  constructor(private routerParams: ActivatedRoute,
              private teamsService: TeamsService) {
  }

  ngOnInit() {
    this.routerParams.params.subscribe(
      (params) => {
        this.teamsService.getTeam(params['id']).subscribe(
          (team) => this.team = team
        );
      }
    );
  }
}
