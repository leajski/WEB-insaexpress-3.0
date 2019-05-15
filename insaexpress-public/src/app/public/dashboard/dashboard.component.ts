import { Component, OnInit } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) { }

  ngOnInit() {
  }

}
