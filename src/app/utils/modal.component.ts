/**
 * The actual modal that gets displayed. Automatically created by the AppComponent.
 */

import {
  Component, HostBinding, Injector, ReflectiveInjector,
  OnInit, ViewEncapsulation
} from '@angular/core';
import {
  AnimationEvent, animate, state, style, transition, trigger
} from '@angular/animations';
import 'rxjs/add/operator/toPromise';

import { LoginComponent } from '../users/login.component';
import { ProblemComponent } from '../problems/problem.component';
import { ModalService } from './modal.service';

@Component({
  selector: 'modal',
  entryComponents: [ LoginComponent, ProblemComponent ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('display', [
      state('active', style({ opacity: 1 })),
      state('inactive', style({ opacity: 0, display: "none" })),
      transition('active <=> inactive', animate(250))
    ])
  ]
})
export class ModalComponent implements OnInit {
  title: string;

  @HostBinding('class.active') componentClass: any;
  display: string = 'inactive';
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

    if (!providers || Object.keys(providers).length === 0) this.injector = this.rootInjector;
    else {
      // Create an injector that will inject the providers into the child
      let resolvedProviders = ReflectiveInjector.resolve(providers);
      this.injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.rootInjector);
    }

    this.display = 'active';
  }

  /**
   * Close the currently open modal dialog.
   */
  close(): void {
    this.display = 'inactive';
  }

  /**
   * Notify the Component of the completion of the modal display animation.
   * @param {AnimationEvent} event - The animation event that was completed
   */
  animationDone(event: AnimationEvent): void {
    // If the event was a "close", then destroy everything when it's over
    if (event.toState === 'inactive') {
      this.componentClass = null;
      this.title = null;
    }
  }
}
