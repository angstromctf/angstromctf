/**
 * The central portal for the logged-in user.
 */

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StatusService } from '../utils/status.service';
import { AlertService } from '../utils/alert.service';
import { TeamsService, UsersService } from '../api/api/api';
import { validateEqual } from '../lib/equal.validator';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  change_password: FormGroup;
  create: FormGroup;
  join: FormGroup;
  account: any;

  constructor(private titleService: Title, private teamsService: TeamsService, private usersService: UsersService, public status: StatusService, private fb: FormBuilder,
              private alert: AlertService) {
    // Create the various forms on the page
    this.change_password = fb.group({
      old: [null, Validators.required],
      password: [null, Validators.required],
      confirm: [null, [Validators.required, validateEqual('password')]]
    });

    this.create = fb.group({
      name: [null, Validators.required],
      school: [null, Validators.required]
    });

    this.join = fb.group({
      code: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Account | ångstromCTF");

    // Load the user's data from the server
    this.teamsService.teamsAccount().toPromise().then(data => this.account = data);
  }

  /**
   * Create a team.
   * @param data - The form data the user submitted..
   */
  doCreate(data: any): void {
    this.teamsService.teamsNew(data).toPromise().then(data => {
      this.account = data;
      // Reload user status data, and notify the user that it was successful
      this.status.reload().then(() => this.alert.open("success", "You've created team " + this.status.team.name + "."));
    }, error => {
      if (error.status === 409) this.alert.open("error", "This team already exists.");
      else this.alert.open("error", "We couldn't create your team.");
    });
  }

  doJoin(data: any): void {
    this.teamsService.teamsJoin(data).toPromise().then(data => {
      this.account = data;
      this.status.reload().then(() => this.alert.open("success", "You've joined team " + this.status.team.name + "."));
    }, error => {
      if (error.status === 409) this.alert.open("error", "This team is already full.");
      else this.alert.open("error", "You couldn't join this team.");
    });
  }

  doChangePassword(data: any): void {
    this.usersService.usersChangePassword(data).toPromise().then(data => {
      this.alert.open("success", "You've changed your password.");
    }, () => {
      this.alert.open("error", "Your password couldn't be changed.");
    });
    this.change_password.reset();
  }
}
