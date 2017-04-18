import { Component, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProblemsApi } from './api/api/api';
import { ModalService } from './modal.service';
import { AlertService } from './alert.service';
import { StatusService } from './status.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-problem',
  templateUrl: './problem.component.html',
})
export class ProblemComponent {
  problem: any;
  form: FormGroup;
  hint: boolean = false;

  constructor(private injector: Injector, private fb: FormBuilder, private problemsApi: ProblemsApi,
              private modalService: ModalService, private alert: AlertService, private status: StatusService) {
    this.problem = injector.get('problem');

    this.form = fb.group({
      guess: [null]
    });
  }

  submit(value: any): void {
    console.log(value);
    this.problemsApi.problemsSubmit(this.problem.id, value).toPromise().then(data => {
      this.alert.alert("success", "You solved problem \"" + this.problem.title + "\" for " + this.problem.value + " points.");
      this.status.reload().then(() => {
        this.problem.solved = true;
        this.modalService.close();
      });
    }, () => this.alert.alert("error", "This wasn't the flag."));
  }

  toggle_hint(): void {
    this.hint = !this.hint;
  }
}
