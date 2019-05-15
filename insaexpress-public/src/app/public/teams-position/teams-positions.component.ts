import {Component, OnInit} from '@angular/core';
import {icon, LatLng, latLng, latLngBounds, marker, tileLayer} from 'leaflet';
import {Team, TeamsService} from '../data/teams.service';
import {ActivatedRoute} from '@angular/router';
import {NullAstVisitor} from '@angular/compiler';

@Component({
  selector: 'app-teams-positions',
  templateUrl: './teams-positions.component.html',
  styleUrls: ['./teams-positions.component.scss']
})
export class TeamsPositionComponent implements OnInit {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'OpenStreetMap'})
    ],
  };
  center = latLng(46.227, 2.213);
  bounds;
  zoom = 16;
  layers = [];
  teams: Team[];

  constructor(private routerParams: ActivatedRoute,
              private teamsService: TeamsService) {
  }

  ngOnInit() {
    this.routerParams.params.subscribe(
      (params) => {
        this.teamsService.getTeams().subscribe(
          (teams) => {
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
                this.layers.push(marker([team.latitude, team.longitude], {
                  icon: icon({
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
            this.center = latLng((minLat + maxLat) / 2, (minLng + maxLng) / 2);
            this.bounds = latLngBounds(latLng(minLat, minLng), latLng(maxLat, maxLng));
            console.log(minLat, minLng, maxLat, maxLng, this.bounds);
            return this.teams = teams;
          }
        );
      }
    );
  }

}
