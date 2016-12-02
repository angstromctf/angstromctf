import { Component } from '@angular/core';
import { StatusService } from './status.service';

@Component({
    selector: 'angstrom-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    constructor(private status: StatusService) { }
}
