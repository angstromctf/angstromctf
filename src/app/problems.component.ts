import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProblemsApi, UsersApi } from './api/api/api';
import { StatusService } from './status.service';
import { ModalService } from './modal.service';
import { ProblemComponent } from './problem.component';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'angstrom-problems',
    templateUrl: './problems.component.html',
    styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {
    problems: any;
    categories: string[];
    account: any;

    constructor(private problemsApi: ProblemsApi, private usersApi: UsersApi, private titleService: Title, private status: StatusService, private modalService: ModalService) { }

    ngOnInit(): void {
        this.titleService.setTitle("Problems | ångstromCTF");

        this.problemsApi.problemsList().toPromise().then(problems => {
            this.problems = problems;

            var organized = {};

            for (let problem of this.problems) {
                if (!(problem.category in organized)) organized[problem.category] = [];
                organized[problem.category].push(problem);
            }

            this.problems = organized;
            this.categories = Object.keys(this.problems);
        });
    }

    show(problem: any) : void {
        this.modalService.update(problem.title, ProblemComponent, { problem: problem });
    }

    submit(problem: any) : void {
        this.problemsApi.problemsSubmit(String(problem.id), {
            flag: problem.guess
        }).toPromise().then(data => problem.solved = true);
    }
}
