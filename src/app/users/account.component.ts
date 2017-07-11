import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StatusService } from '../utils/status.service';
import { AlertService } from '../utils/alert.service';
import { TeamsApi, UsersApi } from '../api/api/api';
import { validateEqual } from '../misc/equal.validator';
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

    constructor(private titleService: Title, private teamsApi: TeamsApi, private usersApi: UsersApi, public status: StatusService, private fb: FormBuilder,
                private alert: AlertService) {
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

        this.teamsApi.teamsAccount().toPromise().then(data => this.account = data);
    }

    do_create(data: any): void {
        this.teamsApi.teamsNew(data).toPromise().then(data => {
          this.account = data;
          this.status.reload().then(() => this.alert.alert("success", "You've created team " + this.status.team.name + "."));
        }, error => {
          if (error.status === 409) this.alert.alert("error", "This team already exists.");
          else this.alert.alert("error", "We couldn't create your team.");
        });
    }

    do_join(data: any): void {
        this.teamsApi.teamsJoin(data).toPromise().then(data => {
            this.account = data;
            this.status.reload().then(() => this.alert.alert("success", "You've joined team " + this.status.team.name + "."));
        }, error => {
          if (error.status === 409) this.alert.alert("error", "This team is already full.");
          else this.alert.alert("error", "You couldn't join this team.");
        });
    }

    do_change_password(data: any): void {
        this.usersApi.usersChangePassword(data).toPromise().then(data => {
          this.alert.alert("success", "You've changed your password.");
        }, () => {
          this.alert.alert("error", "Your password couldn't be changed.");
        });
        this.change_password.reset();
    }
}
