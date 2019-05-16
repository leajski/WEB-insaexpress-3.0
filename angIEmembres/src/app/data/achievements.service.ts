import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Achievement, TeamAchievement, Team } from './team.service';
import {environment} from '../../environments/environment';

@Injectable(  
  {providedIn: 'root'}
)
export class AchievementsService {

  constructor(private http: HttpClient) {
  }

  getAchievements(): Observable<Achievement[]> {
    return new Observable((obs) => {
      const refresh = () => this.http.get<Achievement[]>(environment.INSAExpressApi + '/manage/achievements/').subscribe((achievements) => {
        obs.next(achievements);
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

  attributeAchievement(achievement: Achievement, team: Team): Observable<TeamAchievement> {
    return this.http.post<TeamAchievement>(environment.INSAExpressApi + '/manage/team_achievements/', {
      'achievement_id': achievement.id,
      'team_id': team.id
    });
  }

  createAchivement(achievement: Achievement): Observable<Achievement> {
    return this.http.post<Achievement>(environment.INSAExpressApi + '/manage/achievements/', {
      'name': achievement.name,
      'points': achievement.points
    });
  }

}
