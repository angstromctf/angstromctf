/**
 * Allows other Components to open modals. This is injected into all Components that need it, and gets a handle to the
 * ModalComponent created in the AppComponent.
 */

import { Injectable } from '@angular/core';
import { ModalComponent } from "./modal.component";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModalService {
  // A handle to the ModalComponent
  component: ModalComponent;

  /**
   * Setup this ModalService with a handle to the ModalComponent.
   * @param {ModalComponent} component - The ModalComponent which is created in the AppComponent.
   */
  setup(component: ModalComponent): void {
    this.component = component;
  }

  /**
   * Open a modal dialog.
   * @param {string} title - The title of the modal.
   * @param componentClass - The class of the Componant inside the modal.
   * @param {{}} inputs - Data to inject into the child Component.
   */
  open(title: string, componentClass: any, inputs: { }): void {
    this.component.open(title, componentClass, inputs);
  }

  /**
   * Close the currently open modal dialog.
   */
  close(): void {
    this.component.close();
  }
}
