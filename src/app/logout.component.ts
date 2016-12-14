import { Router } from '@angular/router';
import { OnInit, Component } from "@angular/core";
import { StatusService } from "./status.service";

@Component({
  selector: 'angstrom-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
    constructor (private status: StatusService, private router: Router) { }

    ngOnInit() : void {
        this.status.logout().then(data => this.router.navigateByUrl('/'));
    }
}
