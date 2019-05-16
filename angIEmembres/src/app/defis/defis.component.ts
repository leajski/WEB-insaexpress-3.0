import { Component, OnInit } from '@angular/core';
import { TEAMS } from '../data/ma_liste_de_teams';
import { Achievement, Team, TeamsService } from '../data/team.service';
import { AchievementsService } from '../data/achievements.service';

@Component({
  selector: 'app-defis',
  templateUrl: './defis.component.html',
  styleUrls: ['./../../assets/css/main.css',
  			  './defis.component.css']
})
export class DefisComponent implements OnInit {

 teams: Team[]; 
  achievements: Achievement[];

  selectedTeam : Team;


  constructor(private teamsService: TeamsService,
              private achievementsService: AchievementsService) { }

  ngOnInit() {

  this.getTeams(); 
  this.getAchievements();

  }


  onSelect(team: Team): void{
    this.selectedTeam = team;
  }

  getTeams(): void {
    this.teamsService.getTeams().subscribe((teams) => {
      teams.sort((a, b) => b.score - a.score);
      this.teams = teams;
    });
  }


  getAchievements(): void {
    this.achievementsService.getAchievements().subscribe((achievements) => {
      this.achievements = achievements;
    });
  }

}
