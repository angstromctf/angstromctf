/**
 * The actual alerts that get displayed. Automatically created by the AppComponent.
 */

import {
  Component, Input, OnInit
} from '@angular/core';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';
import 'rxjs/add/operator/toPromise';

import { AlertService } from './alert.service';

const CLOSE_TIME: number = 5000;

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('display', [
      state('in', style({ opacity: 1 })),
      state('void', style({ transform: "translateX(50%)", opacity: 0 })),
      transition('void <=> *', animate(500))
    ])
  ]
})
export class AlertComponent implements OnInit {
  // All the alerts that have been created
  @Input() alerts: any[] = [ { } ];

  // The alerts that are currently open
  @Input() active: number[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    // Give the AlertService a handle to this automatically created AlertComponent
    this.alertService.setup(this);
  }

  /**
   * Open an alert.
   * @param {string} type - The type of the alert, currently either 'success' or 'error'.
   * @param {string} title - The title of the alert.
   * @param {string} message - The message of the alert.
   * @returns {number} - The reference number of the created alert, which is needed to close it.
   */
  open(type: string, title: string, message: string): number {
    // Create the alert, and record its reference number as the old length of the array
    let index: number = this.alerts.push({
      'title': title,
      'message': message,
      'type': type
    }) - 1;

    // Add this to the list of active alerts
    this.active.push(index);

    // Close this alert after CLOSE_TIME milliseconds
    window.setTimeout(() => this.close(index), CLOSE_TIME);

    return index;
  }

  /**
   * Close an alert.
   * @param {number} alert - The reference number of the alert to close.
   */
  close(alert: number): void {
    // Take the open out of the "active" list, which will remove the "active" CSS class
    this.active.splice(this.active.indexOf(alert), 1);
  }
}
