/**
 * Lists all the contest problems.
 */

import { Component, OnInit, InjectionToken } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProblemsApi, UsersApi } from '../api/api/api';
import { StatusService } from '../utils/status.service';
import { ModalService } from '../utils/modal.service';
import { ProblemComponent } from './problem.component';
import 'rxjs/add/operator/toPromise';

// A marker to inject the problem
export const PROBLEM_TOKEN = new InjectionToken<any>('problem');

@Component({
  selector: 'angstrom-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {
  problems: any;
  categories: string[];
  account: any;

  constructor(private problemsApi: ProblemsApi, private usersApi: UsersApi, private titleService: Title, public status: StatusService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Problems | ångstromCTF");

    this.problemsApi.problemsList().toPromise().then(problems => {
      this.problems = problems;

      // Sort the problems into categories
      let organized = {};
      for (let problem of this.problems) {
        if (!(problem.category in organized)) organized[problem.category] = [];
        organized[problem.category].push(problem);
      }

      this.problems = organized;
      this.categories = Object.keys(this.problems);
    });
  }

  /**
   * Display a problem when clicked on.
   * @param problem - The problem to display
   */
  show(problem: any): void {
    // Display the modal for the problem, injecting the specific problem into the ProblemComponent
    this.modalService.update(problem.title, ProblemComponent, [{ provide: PROBLEM_TOKEN, useValue: problem }]);
  }
}
