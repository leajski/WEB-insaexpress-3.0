import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Achievement, Team, TeamAchievement} from './teams.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class AchievementsService {

  constructor(private http: HttpClient) {
  }

  getAchievements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(environment.INSAExpressApi + '/manage/achievements/');
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
