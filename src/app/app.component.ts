import { Component } from '@angular/core';
import { StatusService } from './status.service';

@Component({
    selector: 'angstrom-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    navbarCollapsed: boolean = true;

    constructor(private status: StatusService) { }
}
