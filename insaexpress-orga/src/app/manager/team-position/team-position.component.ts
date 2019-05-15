import {Component, OnInit} from '@angular/core';
import {icon, LatLng, latLng, marker, tileLayer} from 'leaflet';
import {Team, TeamsService} from '../data/teams.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-team-position',
  templateUrl: './team-position.component.html',
  styleUrls: ['./team-position.component.scss']
})
export class TeamPositionComponent implements OnInit {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'OpenStreetMap'})
    ],
  };
  zoom = 5;
  center = latLng(46.227, 2.213);
  layers = [];
  team: Team;

  constructor(private routerParams: ActivatedRoute,
              private teamsService: TeamsService) {
  }

  ngOnInit() {
    this.routerParams.params.subscribe(
      (params) => {
        this.teamsService.getTeam(params['id']).subscribe(
          (team) => {
            this.center = latLng(team.latitude, team.longitude);
            this.zoom = 15;
            this.layers = [marker([team.latitude, team.longitude], {
              icon: icon({
                iconSize: [42, 42],
                iconAnchor: [21, 21],
                iconUrl: team.picture || 'assets/marker-icon.png',
                shadowUrl: 'assets/marker-shadow.png'
              })
            })];
            return this.team = team;
          }
        );
      }
    );
  }

}
