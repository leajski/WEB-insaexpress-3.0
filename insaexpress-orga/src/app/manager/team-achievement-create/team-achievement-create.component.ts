import { Component, OnInit } from '@angular/core';
import {Achievement, Team, TeamsService} from '../data/teams.service';
import {AchievementsService} from '../data/achievements.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-team-achievement-create',
  templateUrl: './team-achievement-create.component.html',
  styleUrls: ['./team-achievement-create.component.scss']
})
export class TeamAchievementCreateComponent implements OnInit {
  team: Team;
  achievement: Achievement;

  constructor(private achievementsService: AchievementsService,
              private teamsService: TeamsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        const team_id = params.id;
        this.teamsService.getTeam(team_id).subscribe((team) => {
          this.team = team;
        });
      }
    );
    this.achievement = new Achievement();
    this.achievement.name = '';
    this.achievement.points = 5;
  }

  create($event) {
    this.achievementsService.createAchivement(this.achievement).subscribe(
      (achievement) => {
        this.assign(achievement);
      },
      () => {
        alert('Impossible de créer ce motif');
      }
    );
    $event.preventDefault();
    return false;
  }

  assign(achievement: Achievement) {
    this.achievementsService.attributeAchievement(achievement, this.team).subscribe(
      () => {
        this.router.navigate(['teams', this.team.id]);
      },
      () => {
        alert('Impossible d\'affecter la réussite :-(');
      }
    );
  }

}
