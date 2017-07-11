import { Component, Injectable } from '@angular/core';
import { ModalComponent } from "./modal.component";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModalService {
  modal: ModalComponent;

  setup(modal: ModalComponent): void {
    this.modal = modal;
  }

  update(title: string, componentClass: any, inputs: {}): void {
    this.modal.update(title, componentClass, inputs);
  }

  close(): void {
    this.modal.update(null, null, null);
  }
}
