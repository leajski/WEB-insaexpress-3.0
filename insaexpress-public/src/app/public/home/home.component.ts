import {Component, HostListener, OnInit} from '@angular/core';
import {Team, TeamsService} from '../data/teams.service';
import {DomEvent, icon, latLng, latLngBounds, tileLayer} from 'leaflet';
import * as leaflet from 'leaflet';
import off = DomEvent.off;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  teams: Team[];
  mobile: boolean;
  mode = 'ranking';
  options = {
    zoom: 6,
    center: latLng(46.227638, 2.213749),
  };
  markers: Map<number, leaflet.Marker> = new Map();
  map: leaflet.Map;
  private defaultIcon = leaflet.icon({
    iconSize: [25, 41],
    iconAnchor: [13, 41],
    iconUrl: '/assets/marker-icon.png',
    shadowUrl: '/assets/marker-shadow.png'
  });
  alreadyLoaded = false;

  constructor(private teamsService: TeamsService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobile = event.target.innerWidth <= 767;
  }

  ngOnInit() {
    this.mobile = window.innerWidth <= 767;
    this.teamsService.getTeams().subscribe((teams) => {
      teams.forEach((team) => {
        const marker = this.generateMarker(team);
        if(this.markers.has(team.id)) {
          this.markers.get(team.id).remove();
        }
        this.markers.set(team.id, marker);
        if (this.map) {
          marker.addTo(this.map);
        }
      });
      if (this.map && !this.alreadyLoaded) {
          this.refreshMapBounds(teams, this.map);
      }
      teams.sort((a, b) => b.score - a.score);
      this.teams = teams;
      this.alreadyLoaded = true;
    });
    setInterval(() => {
      const seed = Math.random() * this.markers.size * 5;
      this.markers.forEach((marker, id) => {
        let offset = 100 + (seed + id) % this.markers.size;
        marker.setZIndexOffset(offset);
      });
    }, 20);
  }

  onMapReady(map: any) {
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    leaflet.control.scale().addTo(map);
    if (this.teams) {
      this.teams.forEach((team) => {
        const marker = this.generateMarker(team);
        this.markers.set(team.id, marker);
        if (this.markers.has(team.id))
          this.markers.get(team.id).remove();
        marker.addTo(map);
      });
      this.refreshMapBounds(this.teams, map);
    }
    this.map = map;
  }

  private refreshMapBounds(teams: Team[], map: any) {
    let minLat = Number.MAX_VALUE, maxLat = Number.MIN_VALUE, minLng = Number.MAX_VALUE, maxLng = Number.MIN_VALUE;
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
      }
    });
    minLng -= 0.0035;
    maxLng += 0.0035;
    minLat -= 0.0025;
    maxLat += 0.0025;
    const bounds = latLngBounds(latLng(minLat, minLng), latLng(maxLat, maxLng));
    map.fitBounds(bounds);
  }

  generateMarker(team: Team) {
    const marker = leaflet.marker([team.latitude, team.longitude], {icon: leaflet.icon({
        iconSize: [42, 42],
        iconAnchor: [21, 21],
        iconUrl: team.picture,
      })});
    marker.setLatLng(latLng(team.latitude, team.longitude));
    marker.bindTooltip(team.name);
    return marker;
  }

}
