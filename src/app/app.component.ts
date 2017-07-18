/**
 * "Master template" for all the pages on the site.
 */

import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { StatusService } from './utils/status.service';
import { ModalService } from './utils/modal.service';
import { AlertService } from './utils/alert.service';
import { LoginComponent } from './users/login.component';

@Component({
    selector: 'angstrom-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public status: StatusService, private modalService: ModalService, private alert: AlertService, private router: Router) { }

  /**
   * Open the login prompt.
   */
  login(): void {
    this.modalService.open("Login", LoginComponent, {});
  }

  /**
   * Log out the user.
   */
  logout(): void {
    this.status.logout().then(() => {
      // Notify the user and navigate back to the index
      this.alert.open("success", "You've been logged out.");
      this.router.navigateByUrl('/');
    });
  }

  /**
   * Close the modal when the escape key is pressed.
   */
  @HostListener('document:keydown.escape')
  escape(): void {
    this.modalService.close();
  }
}
