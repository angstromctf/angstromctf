import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamsApi } from '../api/api/api';
import { StatusService } from '../utils/status.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'angstrom-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  team: any;

  constructor(private route: ActivatedRoute, private teamsApi: TeamsApi, public status: StatusService) { }

  ngOnInit(): void {
    // Locates the team number from the query string and calls the API to get its information
    this.route.params
      .switchMap((params: Params) => this.teamsApi.teamsProgress(params['id']))
      .subscribe(team => this.team = team);
  }
}
