import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProblemsApi, UsersApi } from './api/api/api';
import { StatusService } from './status.service';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-problems',
    templateUrl: 'problems.component.html',
})
export class ProblemsComponent implements OnInit {
    problems: any;
    account: any;

    constructor(private problemsApi: ProblemsApi, private usersApi: UsersApi, private titleService: Title, private status: StatusService) { }

    ngOnInit(): void {
        this.titleService.setTitle("Problems | ångstromCTF");

        this.problemsApi.problemsList().toPromise().then(problems => {
            this.problems = problems;

            for (let problem of this.problems) {
                problem.collapsed = problem.solved;
            }
        });
    }

    submit(problem: any) : void {
        this.problemsApi.problemsSubmit(String(problem.id), {
            flag: problem.guess
        }).toPromise().then(data => {
            problem.solved = true;
            problem.collapsed = true;
        });
    }
}
