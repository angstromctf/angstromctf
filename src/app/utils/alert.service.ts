/**
 * Allows other Components to open alerts. This is injected into all Components that need it, and gets a handle to the
 * AlertComponent created in the AppComponent.
 */

import { Injectable } from '@angular/core';
import { AlertComponent } from "./alert.component";
import 'rxjs/add/operator/toPromise';

/**
 * Randomly choose from a list.
 * @param {any[]} choices - The list to choose from.
 * @returns {any} - Any member of the list, with equal probability.
 */
function choose(choices: any[]): any {
  return choices[Math.floor(Math.random() * choices.length)];
}

@Injectable()
export class AlertService {
  // A handle to the AlertComponent which actually displays the alerts
  component: AlertComponent;

  // The different titles that each type of alert can use; one is randomly selected
  TITLES = {
    'success': ["Yay!", "Cool!", "Success!"],
    'error': ["Oh no.", "Whoops.", "We're sorry."]
  };

  /**
   * Setup this AlertService with a handle to the AlertComponent.
   * @param {AlertComponent} component - The AlertComponent which is created in the AppComponent.
   */
  setup(component: AlertComponent): void {
    this.component = component;
  }

  /**
   * Open an alert.
   * @param {string} type - The type of alert to open.
   * @param {string} message - The message of the alert.
   * @returns {number} - The reference number to the created alert, which is needed to close it.
   */
  open(type: string, message: string): number {
    return this.component.open(type, choose(this.TITLES[type]), message);
  }

  /**
   * Close an alert.
   * @param {number} alert - The reference number of the alert to close.
   */
  close(alert: number): void {
    this.component.close(alert);
  }
}
