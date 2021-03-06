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
    {name: 'Ian Rackow', role: 'Project lead, problem developer', year: 'Senior'},
    {name: 'William Wang', role: 'Project lead, problem developer', year: 'Senior', site: 'https://defund.io'},
    {name: 'Kevin Higgs', role: 'Platform lead, problem developer', year: 'Sophomore', site: 'https://kmh.zone'},
    {name: 'Clarence Lam', role: 'Problem developer', year: 'Freshman'}
  ];

  constructor(private titleService: Title) { }

  /** Randomly shuffle the array of people. */
  ngOnInit(): void {
    this.titleService.setTitle("About | ångstromCTF");

    // Adapted from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    /*for (let i = this.people.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.people[i - 1], this.people[j]] = [this.people[j], this.people[i - 1]];
    }*/
  }
}
