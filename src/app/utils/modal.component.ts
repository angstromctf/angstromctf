import {
  Component, Injector, Input, ReflectiveInjector,
  HostBinding, OnInit, ViewEncapsulation
} from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { LoginComponent } from '../users/login.component';
import { ProblemComponent } from '../problems/problem.component';
import { ModalService } from './modal.service';

@Component({
  selector: 'modal',
  entryComponents: [ LoginComponent, ProblemComponent ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @HostBinding('class.active') componentClass;
  injector;

  constructor(private rootInjector: Injector, public modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.setup(this);
  }

  update(title: string, componentClass: any, providers: any): void {
    this.title = title;
    this.componentClass = componentClass;

    if (!providers) this.injector = this.rootInjector;
    else {
      let resolvedProviders = ReflectiveInjector.resolve(providers);
      this.injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.rootInjector);
    }
  }
}
