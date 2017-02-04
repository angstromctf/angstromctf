import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TeamsApi } from './api/api/api';
import { StatusService } from './status.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-sponsors',
  templateUrl: './sponsors.component.html',
})
export class SponsorsComponent {
    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle("Sponsors | ångstromCTF");
    }
}
