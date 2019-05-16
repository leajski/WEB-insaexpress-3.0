import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TEAMS } from '../data/ma_liste_de_teams';
import { Team, TeamsService } from '../data/team.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./../../assets/css/main.css',
              './new.component.css', ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewComponent implements OnInit {

  teams: Team[];

  selectedTeam : Team;

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    this.getTeams();

    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const mymap = L.map('mapfrance').setView([45.750000, 4.850000], 13);
   
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'France Map'
    }).addTo(mymap);



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
}
