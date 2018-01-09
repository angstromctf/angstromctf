/**
 * Information about a specific team.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamsService } from '../api/api/teams.service';
import { StatusService } from '../utils/status.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'angstrom-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  team: any;

  constructor(private route: ActivatedRoute, private teamsService: TeamsService, public status: StatusService) { }

  ngOnInit(): void {
    // Locates the team number from the query string and calls the API to get its information
    this.route.params
      .switchMap((params: Params) => this.teamsService.teamsProgress(params['id']))
      .subscribe(team => this.team = team);
  }
}
