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

        window.setInterval(() => this.update(), 30000);
    }

    update(): void {
      this.teamsApi.teamsList().toPromise().then(data => {
        this.teams = data;

        let rank = 1;
        for (let team of this.teams) {
          if (team.eligible) team.rank = rank++;
        }
      });
    }
}
