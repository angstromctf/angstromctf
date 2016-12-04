import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-account',
    templateUrl: 'account.component.html',
})
export class AccountComponent implements OnInit {
    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle("Account | ångstromCTF");
    }
}
