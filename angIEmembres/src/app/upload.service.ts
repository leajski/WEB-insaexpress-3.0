import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Achievement, TeamAchievement, Team } from './data/team.service';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  DJANGO_SERVER: string = "http://127.0.0.1:8000";
  constructor(private http: HttpClient) { }

  public upload(formData) {
    return this.http.post<any>(`${this.DJANGO_SERVER}/upload/`, formData);
  }

  addNamePicture(achievement: Achievement, team: Team, formData): Observable<TeamAchievement> {
    return this.http.post<TeamAchievement>(environment.INSAExpressApi + '/manage/team_achievements/', {
      'achievement_id': achievement.id,
      'team_id': team.id,
      'picture': formData.get('file')
    });
  }

}
