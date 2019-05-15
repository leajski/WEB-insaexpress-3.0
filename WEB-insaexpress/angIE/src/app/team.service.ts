import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

export class Achievement {
  id: number;
  name: string;
  points: number;
}

export class Team {
  id: number;
  name: string;
  picture: string;
  latitude: number;
  longitude: number;
  score: number;
  disqualified: boolean;
  team_achievements: TeamAchievement[];
  participants: {name: string, phone: string}[];
}

export class TeamAchievement {
  created_at: string;
  achievement: Achievement;
  team_id: number;
}

@Injectable(
  {providedIn: 'root'}
)
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return new Observable((obs) => {
      const refresh = () => this.http.get<Team[]>('http://localhost:8000' + '/teams/').subscribe((teams) => {
        obs.next(teams);
        if (!obs.closed) {
          setTimeout(refresh, 30000);
        } else {
          obs.complete();
        }
      }, (err) => {
        obs.error(err);
      });

      refresh.call(this);
    });
  }

  getTeam(id: string): Observable<Team> {
    return this.http.get<Team>('http://localhost:8000' + '/teams/' + id + '/');
  }

}
