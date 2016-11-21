import { Component, OnInit } from '@angular/core';
import { TeamsApi } from './api/api/api';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-scoreboard',
    templateUrl: 'scoreboard.component.html',
})
export class ScoreboardComponent implements OnInit {
    teams: any;

    constructor(private teamsApi: TeamsApi) { }

    ngOnInit(): void {
        this.teamsApi.teamsList().toPromise().then(data => {this.teams = data; console.log(data);});
    }
}
