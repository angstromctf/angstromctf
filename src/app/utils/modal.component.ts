/**
 * The actual modal that gets displayed. Automatically created by the AppComponent.
 */

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

  // Sets the 'active' CSS class on the component when componentClass is non-null
  @HostBinding('class.active') componentClass;

  injector: Injector;

  constructor(private rootInjector: Injector, public modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.setup(this);
  }

  /**
   * Open a modal dialog.
   * @param {string} title - The title of the modal.
   * @param componentClass - The class of the Component inside the modal.
   * @param providers - Data to inject into the child Component.
   */
  open(title: string, componentClass: any, providers: any): void {
    this.title = title;
    this.componentClass = componentClass;

    if (!providers) this.injector = this.rootInjector;
    else {
      // Create an injector that will inject the providers into the child
      let resolvedProviders = ReflectiveInjector.resolve(providers);
      this.injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.rootInjector);
    }
  }

  /**
   * Close the currently open modal dialog.
   */
  close(): void {
    this.componentClass = null;
    this.title = null;
  }
}
