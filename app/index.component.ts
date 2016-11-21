import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'angstrom-index',
    templateUrl: 'index.component.html',
})
export class IndexComponent implements OnInit {
    teams: any;

    constructor(private title: Title) { }

    ngOnInit(): void {
        this.title.setTitle("ångstromCTF");
    }
}
