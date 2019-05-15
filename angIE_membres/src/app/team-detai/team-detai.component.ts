import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../team.service';

@Component({
  selector: 'app-team-detai',
  templateUrl: './team-detai.component.html',
  styleUrls: ['./team-detai.component.css']
})
export class TeamDetaiComponent implements OnInit {
  @Input() team: Team;

  constructor() { }

  ngOnInit() {
  }

}
