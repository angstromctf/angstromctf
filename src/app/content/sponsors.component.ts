/**
 * A list of ångstromCTF's sponsors.
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-sponsors',
  templateUrl: './sponsors.component.html',
})
export class SponsorsComponent implements OnInit {
    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle("Sponsors | ångstromCTF");
    }
}
