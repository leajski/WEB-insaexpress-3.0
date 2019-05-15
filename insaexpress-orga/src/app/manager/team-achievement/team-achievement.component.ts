import {Component, OnInit} from '@angular/core';
import {AchievementsService} from '../data/achievements.service';
import {Achievement, Team, TeamsService} from '../data/teams.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-team-achievement',
  templateUrl: './team-achievement.component.html',
  styleUrls: ['./team-achievement.component.scss']
})
export class TeamAchievementComponent implements OnInit {
  team: Team;
  achievements: Achievement[];

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
    this.achievementsService.getAchievements().subscribe((achievements) => {
      this.achievements = achievements;
    });
  }

  assign(achievement: Achievement) {
    this.achievementsService.attributeAchievement(achievement, this.team).subscribe(
      () => {
        this.router.navigate(['..'], {relativeTo: this.activatedRoute});
      },
      () => {
        alert('Impossible d\'affecter la réussite :-(');
      }
    );
  }

}
