/**
 * The interface for interacting with a single CTF problem.
 */

import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProblemsService } from '../api/api/problems.service';
import { ModalService } from '../utils/modal.service';
import { AlertService } from '../utils/alert.service';
import { StatusService } from '../utils/status.service';
import { PROBLEM_TOKEN } from './problems.component';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-problem',
  templateUrl: './problem.component.html',
})
export class ProblemComponent {
  form: FormGroup;
  hint: boolean = false;

  constructor(private fb: FormBuilder, private problemsService: ProblemsService, private modalService: ModalService,
              private alert: AlertService, public status: StatusService, @Inject(PROBLEM_TOKEN) public problem: any) {
    this.form = fb.group({
      guess: [null]
    });
  }

  /**
   * Submit a problem to the server.
   * @param flag The user's guess for the flag
   */
  submit(flag: any): void {
    this.problemsService.problemsSubmit(this.problem.id, flag).toPromise().then(() => {
      this.alert.open("success", "You solved problem \"" + this.problem.title + "\" for " + this.problem.value + " points.");

      // Recalculate the user's score
      this.status.reload().then(() => {
        this.problem.solved = true;
        this.modalService.close();
      });
    }, () => this.alert.open("error", "That wasn't the flag."));
  }

  /**
   * Toggle whether the hint should be displayed.
   */
  toggleHint(): void {
    this.hint = !this.hint;
  }
}
