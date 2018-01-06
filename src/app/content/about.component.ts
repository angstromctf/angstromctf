/**
 * Contains information on the rules of the competition, as well as the ångstromCTF team.
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  people: any = [
    {name: 'Noah Singer', role: 'Director, technical lead, learning materials', year: 'Senior', site: 'https://singerng.github.io/'},
    {name: 'Artemis Tosini', role: 'Deployment and infrastructure', year: 'Senior', site: 'https://artemis.re/'},
    {name: 'Andrew Komo', role: 'Problems lead', year: 'Senior'},
    {name: 'George Klees', role: 'Binary and reverse engineering problems', year: 'Senior'},
    {name: 'Chris Wang', role: 'Graphic design', year: 'Senior'},
    {name: 'Noah Kim', role: 'Platform developer', year: 'Senior', site: 'https://noahbkim.com/'},
    {name: 'Ian Rackow', role: 'Outreach, sponsors, web problems', year: 'Junior'},
    {name: 'William Wang', role: 'Problems', year: 'Junior', site: 'https://defund.io'},
    {name: 'Kevin Higgs', role: 'Problems, platform developer', year: 'Freshman', site: 'https://kmh.zone'}
  ];

  constructor(private titleService: Title) { }

  /** Randomly shuffle the array of people. */
  ngOnInit(): void {
    this.titleService.setTitle("About | ångstromCTF");

    // Adapted from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    for (let i = this.people.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.people[i - 1], this.people[j]] = [this.people[j], this.people[i - 1]];
    }
  }
}
