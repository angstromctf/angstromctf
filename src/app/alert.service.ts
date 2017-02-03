import { Component, Injectable } from '@angular/core';
import { AlertComponent } from "./alert.component";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlertService {
  component: AlertComponent;

  setup(component: AlertComponent) : void {
    this.component = component;
  }

  alert(title: string, message: string, type: string) : number {
    return this.component.alert(title, message, type);
  }

  close(alert: number) : void {
    this.component.close(alert);
  }
}
