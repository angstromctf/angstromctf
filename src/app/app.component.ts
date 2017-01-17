import { Component, ViewChild, HostListener } from '@angular/core';

import { StatusService } from './status.service';
import { ModalService } from './modal.service';
import { LoginComponent } from './login.component';
import { ModalComponent } from './modal.component';

@Component({
    selector: 'angstrom-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    navbarCollapsed: boolean = true;
    @ViewChild(ModalComponent) modal;

    constructor(private status: StatusService, private modalService: ModalService) { }

    login() : void {
      this.modalService.update("Login", LoginComponent, {});
    }

    @HostListener('document:keydown.escape')
    escape() : void {
      this.modalService.close();
    }
}
