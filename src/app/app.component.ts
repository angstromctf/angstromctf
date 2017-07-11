import { Component, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { StatusService } from './status.service';
import { ModalService } from './modal.service';
import { AlertService } from './alert.service';
import { LoginComponent } from './login.component';

@Component({
    selector: 'angstrom-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(public status: StatusService, private modalService: ModalService, private alert: AlertService, private router: Router) { }

  login(): void {
    this.modalService.update("Login", LoginComponent, {});
  }

  logout(): void {
    this.status.logout().then(() => {
      this.alert.alert("success", "You've been logged out.");
      this.router.navigateByUrl('/');
    });
  }

  @HostListener('document:keydown.escape')
  escape(): void {
    this.modalService.close();
  }
}
