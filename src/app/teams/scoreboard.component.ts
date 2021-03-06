/**
 * Computes a global ranking of all the teams.
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TeamsService } from '../api/api/teams.service';
import { StatusService } from '../utils/status.service';
import { ChartService } from '../utils/chart.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-scoreboard',
  templateUrl: './scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit {
  teams: any;
  allTeams: any;
  eligibleTeams: any;
  showIneligible: boolean;
  colors = ["#bf42f4", "#3d23b2", "#2352b2", "#d12792", "#7b0396", "#118adb", "#ff72ee", "#3f0182", "#07248e", "#ad2bd1"];

  constructor(private teamsService: TeamsService, private titleService: Title, public status: StatusService, private chartService: ChartService) { }

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
    this.teamsService.teamsList().toPromise().then(data => {
      this.allTeams = data;

      this.eligibleTeams = this.allTeams.filter(team => team.eligible);

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
      // this.updateChart();
  }

  // updateChart(): void {
  //   let minX = Infinity;
  //   let maxX = 0;
  //   let maxY = 0;
  //   let lines = [];
  //   let team = 0;
  //   let teamColors = {};
  //
  //   for (let i = 0; i < (this.teams.length < 10 ? this.teams.length: 10); i++) {
  //     teamColors[this.teams[i].name] = this.colors[i%this.colors.length];
  //     this.teamsService.teamsProgress(this.teams[i].id).toPromise().then(data => {
  //       let solves = data["solves"];
  //       let points = [];
  //       let score = 0;
  //       for (let j = 0; j < solves.length; j++) {
  //         score += solves[j].problem.value;
  //         let point = [(+new Date(solves[j].time) - this.status.competition.start) / 100000, score];
  //         if (point[0] < minX) {
  //           minX = point[0];
  //         }
  //         if (point[0] > maxX) {
  //           maxX = point[0];
  //         }
  //         if (point[1] > maxY) {
  //           maxY = point[1];
  //         }
  //         points.push(point);
  //       }
  //       lines.push({points: points, color: teamColors[data.name], name: data.name, id: this.teams.filter((x) => {return x.name == data.name})[0].id});
  //       team += 1;
  //
  //       if (team == 10) {
  //         lines.sort((function (b, a) { return this.that.teams.filter((x) => { return x.name == a.name })[0].rank-this.that.teams.filter((x) => { return x.name == b.name })[0].rank}).bind({that: this}));
  //         this.chartService.setBounds(minX, maxX, 0, maxY);
  //         this.chartService.setLines(lines);
  //       }
  //     })
  //   }

  // }
}
