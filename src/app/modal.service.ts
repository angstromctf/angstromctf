import { Component, Injectable } from '@angular/core';
import { ModalComponent } from "./modal.component";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModalService {
  modal: ModalComponent;

  setup(modal : ModalComponent) : void {
    this.modal = modal;
  }

  update(title: string, component : Component, inputs : {}) {
    this.modal.update(title, component, inputs);
  }

  close() {
    this.modal.update(null, null, null);
  }
}
