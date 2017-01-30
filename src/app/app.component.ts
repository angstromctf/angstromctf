import { Component, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { StatusService } from './status.service';
import { ModalService } from './modal.service';
import { AlertService } from './alert.service';
import { LoginComponent } from './login.component';
import { ModalComponent } from './modal.component';

@Component({
    selector: 'angstrom-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    navbarCollapsed: boolean = true;
    @ViewChild(ModalComponent) modal;

    constructor(private status: StatusService, private modalService: ModalService, private alertService: AlertService, private router: Router) { }

    login() : void {
      console.log("yay");
      this.modalService.update("Login", LoginComponent, {});
    }

    logout() : void {
      this.status.logout().then(data => this.router.navigateByUrl('/'));
    }

    @HostListener('document:keydown.escape')
    escape() : void {
      this.modalService.close();
    }
}
