import { Component } from '@angular/core';
import { ApiClientService } from './api.service';

@Component({
    moduleId: module.id,
    selector: 'angstrom-scoreboard',
    templateUrl: 'scoreboard.component.html',
})
export class ScoreboardComponent {
    constructor(private apiService: ApiClientService) { }
}
