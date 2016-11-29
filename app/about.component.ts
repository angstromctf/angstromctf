import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-about',
    templateUrl: 'about.component.html',
})
export class AboutComponent implements OnInit {
    people: any = [
        {name: 'Noah Singer', role: 'Director, lead platform developer, learning materials', year: 'Junior'},
        {name: 'Artemis Tosini', role: 'Deployment and infrastructure', year: 'Junior', site: 'https://artemis.re/'},
        {name: 'Andrew Komo', role: 'Crypto problems', year: 'Junior'},
        {name: 'George Klees', role: 'Binary and reverse engineering problems', year: 'Junior'},
        {name: 'Daniel Chen', role: 'Outreach and sponsors', year: 'Senior'},
        {name: 'Chris Wang', role: 'Graphic design', year: 'Junior'},
        {name: 'Noah Kim', role: 'Platform developer', year: 'Junior', site: 'https://noahbkim.com/'},
        // {name: 'Ian Rackow', role: 'Outreach, sponsors, web problems', year: 'Sophomore'},
        // {name: 'William Wang', role: 'Forensics problems', year: 'Sophomore'}
    ];

    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle("About | ångstromCTF");

        /* Adapted from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript */
        for (let i = this.people.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [this.people[i - 1], this.people[j]] = [this.people[j], this.people[i - 1]];
        }
    }
}
