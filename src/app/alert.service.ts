import { Component, Injectable } from '@angular/core';
import { AlertComponent } from "./alert.component";
import 'rxjs/add/operator/toPromise';

export function choose(choices: any[]): any {
  return choices[Math.floor(Math.random() * choices.length)];
}

@Injectable()
export class AlertService {
  component: AlertComponent;
  MESSAGES = {
    "success": ["Yay!", "Cool!", "Success!"],
    "error": ["Oh no.", "Whoops.", "We're sorry."]
  };

  setup(component: AlertComponent) : void {
    this.component = component;
  }

  alert(type: string, message: string) : number {
    return this.component.alert(choose(this.MESSAGES[type]), message, type);
  }

  close(alert: number) : void {
    this.component.close(alert);
  }
}
