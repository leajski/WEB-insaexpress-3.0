import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

export class Achievement {
  id: number;
  name: string;
  points: number;
}

export class TeamAchievement {
  created_at: string;
  achievement: Achievement;
  team_id: number;
}

export class Team {
  id: number;
  name: string;
  picture: string;
  latitude: number;
  longitude: number;
  distance: number;
  score: number;
  disqualified: boolean;
  team_achievements: TeamAchievement[];
  participants: {name: string, phone: string}[];
}

@Injectable()
export class TeamsService {

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<Team[]> {
    return new Observable((obs) => {
      const refresh = () => this.http.get<Team[]>(environment.INSAExpressApi + '/manage/teams/').subscribe((teams) => {
        obs.next(teams);
        if (!obs.closed) {
          setTimeout(refresh, 5000);
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
    return this.http.get<Team>(environment.INSAExpressApi + '/manage/teams/' + id + '/');
  }

}
