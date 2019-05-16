import { Component, OnInit } from '@angular/core';
import { TEAMS } from '../data/ma_liste_de_teams';
import { Team, TeamsService } from '../data/team.service';
import * as L from 'leaflet';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./../../assets/css/main.css',
              './new.component.css',

  ]
})
export class NewComponent implements OnInit {

  teams: Team[];
  center = L.latLng(46.227, 2.213);
  bounds;
  zoom = 16;
  layers = [];


  selectedTeam : Team;

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    
    this.getTeams();

    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const mymap = L.map('mapfrance').setView([45.750000, 4.850000], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'France Map'
    }).addTo(mymap);

    const myIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });
  L.marker([50.6311634, 3.0599573], {icon: myIcon}).bindPopup('Je suis un Frugal Marqueur').addTo(mymap).openPopup();
 




  }

  onSelect(team: Team): void{
    this.selectedTeam = team;
  }

  getTeams(): void {
    this.teamsService.getTeams().subscribe((teams) => {
      teams.sort((a, b) => b.score - a.score);
      let minLat = Number.MAX_VALUE, maxLat = Number.MIN_VALUE, minLng = Number.MAX_VALUE, maxLng = Number.MIN_VALUE;
      this.layers = [];
      teams.forEach((team) => {
        if (typeof team.latitude === 'number' && !Number.isNaN(team.latitude) &&
          typeof team.longitude === 'number' && !Number.isNaN(team.longitude)) {
          if (minLat > team.latitude) {
            minLat = team.latitude;
          }
          if (maxLat < team.latitude) {
            maxLat = team.latitude;
          }
          if (minLng > team.longitude) {
            minLng = team.longitude;
          }
          if (maxLng < team.longitude) {
            maxLng = team.longitude;
          }
          this.layers.push(L.marker([team.latitude, team.longitude], {
            icon: L.icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: 'assets/marker-shadow.png'
            })
          }));
        }
      });
      minLng -= 0.0035;
      maxLng += 0.0035;
      minLat -= 0.0025;
      maxLat += 0.0025;
      this.center = L.latLng((minLat + maxLat) / 2, (minLng + maxLng) / 2);
      this.bounds = L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng));
      console.log(minLat, minLng, maxLat, maxLng, this.bounds);
      this.teams = teams;
    });
  }
}
