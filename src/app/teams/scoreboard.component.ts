/**
 * Computes a global ranking of all the teams.
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TeamsApi } from '../api/api/api';
import { StatusService } from '../utils/status.service';
import { ChartService } from '../utils/chart.service';
import 'rxjs/add/operator/toPromise';

const START_TIME = 1492876800000;

@Component({
  selector: 'angstrom-scoreboard',
  templateUrl: './scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit {
  teams: any;
  allTeams: any;
  eligibleTeams: any;
  showIneligible: boolean;
  colors = ["#bf42f4", "#3d23b2", "#2352b2", "#d12792", "#7b0396", "#118adb", "#ff72ee", "#3f0182", "#07248e", "#ad2bd1"]
  constructor(private teamsApi: TeamsApi, private titleService: Title, public status: StatusService, private chartService: ChartService) {

  }

  ngOnInit(): void {
    this.titleService.setTitle("Scoreboard | ångstromCTF");
    this.update();


    // Update the scoreboard every minute
    window.setInterval(() => this.update(), 60000);
  }

  /**
   * Update the scoreboard by getting the list of teams and (re-)computing the rankings.
   */
  update(): void {
    this.teamsApi.teamsList().toPromise().then(data => {
      this.allTeams = data;

      this.eligibleTeams = this.allTeams.filter(function (obj) {
        return obj.eligible;
      });

      // Rank the eligible teams
      let rank = 1;
      for (let team of this.allTeams) {
        if (team.eligible){
          team.rank = rank++;
        }
      }
      this.updateList();
    });
  }

  updateList(): void {
      if (this.showIneligible) this.teams = this.allTeams;
      else this.teams = this.eligibleTeams;
      this.updateChart();
  }

  updateChart(): void {
    var minX = Infinity;
    var maxX = 0;
    var maxY = 0;
    var lines = [];
    var clear = this.chartService.component.lines.length;
    var team = 0;
    var teamColors = {}
    for (var i = 0; i < (this.teams.length < 10 ? this.teams.length: 10); i++) {
      teamColors[this.teams[i].name] = this.colors[i%this.colors.length]
      this.teamsApi.teamsProgress(this.teams[i].id).toPromise().then(data => {
        var solves = data["solves"];
        var points = [];
        var score = 0;
        for (var j = 0; j < solves.length; j++) {
          score += solves[j].problem.value;
          var point = [(+new Date(solves[j].time)-START_TIME)/100000, score];
          if (point[0] < minX) {
            minX = point[0];
          }
          if (point[0] > maxX) {
            maxX = point[0];
          }
          if (point[1] > maxY) {
            maxY = point[1];
          }
          points.push(point);
        }
        if (clear > 0) {
          this.chartService.clearLines(1);
          clear--;
        }
        this.chartService.addLine({points: points, color: teamColors[data["name"]], name: data["name"]});
        team += 1;
        if (team == 10) { this.chartService.setBounds(minX, maxX, 0, maxY); }
      })
    }

  }
}
