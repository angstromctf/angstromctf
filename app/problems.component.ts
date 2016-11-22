import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProblemsApi, UsersApi } from './api/api/api';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-problems',
    templateUrl: 'problems.component.html',
})
export class ProblemsComponent implements OnInit {
    problems: any;
    account: any;

    constructor(private problemsApi: ProblemsApi, private usersApi: UsersApi, private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle("Problems | ångstromCTF");
        this.problemsApi.problemsList().toPromise().then(problems => this.problems = problems);
        this.usersApi.usersAccount().toPromise().then(account => this.account = account);
    }
}
