import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProblemsApi } from './api/api/api';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-problems',
    templateUrl: 'problems.component.html',
})
export class ProblemsComponent implements OnInit {
    problems: any;

    constructor(private problemsApi: ProblemsApi, private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle("Problems | ångstromCTF");
        this.problemsApi.problemsList().toPromise().then(data => this.problems = data);
    }
}
