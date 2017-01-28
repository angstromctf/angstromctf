import { Component, Injectable } from '@angular/core';
import { AlertComponent } from "./alert.component";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlertService {
  alert: AlertComponent;

  setup(alert : AlertComponent) : void {
    this.alert = alert;
  }

  update(title: string, message: string) {
    this.alert.title = title;
    this.alert.message = message;
  }

  close() {
    this.alert.title = null;
    this.alert.message = null;
  }
}
