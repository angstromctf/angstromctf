import { Component, Injectable } from '@angular/core';
import { AlertComponent } from "./alert.component";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlertService {
  component: AlertComponent;

  setup(component: AlertComponent) : void {
    this.component = component;
  }

  alert(title: string, message: string) {
    this.component.title = title;
    this.component.message = message;
  }

  close() {
    this.component.title = null;
    this.component.message = null;
  }
}
