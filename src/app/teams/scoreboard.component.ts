/**
 * Computes a global ranking of all the teams.
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TeamsApi } from '../api/api/api';
import { StatusService } from '../utils/status.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-scoreboard',
  templateUrl: './scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit {
  teams: any;

  constructor(private teamsApi: TeamsApi, private titleService: Title, public status: StatusService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Scoreboard | ångstromCTF");
    this.update();

    // Update the scoreboard every 30 seconds
    window.setInterval(() => this.update(), 30000);
  }

  /**
   * Update the scoreboard by getting the list of teams and (re-)computing the rankings.
   */
  update(): void {
    this.teamsApi.teamsList().toPromise().then(data => {
      this.teams = data;

      // Rank the eligible teams
      let rank = 1;
      for (let team of this.teams) {
        if (team.eligible) team.rank = rank++;
      }
    });
  }
}
