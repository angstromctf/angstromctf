import { Component, Injector } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-problem',
  templateUrl: './problem.component.html',
})
export class ProblemComponent {
  problem: any;

  constructor(private injector: Injector) {
    this.problem = injector.get('problem');
  }
}
