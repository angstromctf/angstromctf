import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StatusService } from './status.service';
import { AlertService } from './alert.service';
import { TeamsApi } from './api/api/api';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
    create: FormGroup;
    join: FormGroup;
    account: any;

    constructor(private titleService: Title, private teamsApi: TeamsApi, private status: StatusService, private fb: FormBuilder,
                private alert: AlertService) {
        this.create = fb.group({
            name: [null, Validators.required],
            school: [null, Validators.required]
        });

        this.join = fb.group({
            code: [null, Validators.required]
        });
    }

    ngOnInit() : void {
        this.titleService.setTitle("Account | ångstromCTF");

        this.teamsApi.teamsAccount().toPromise().then(data => this.account = data);
    }

    do_create(data: any) : void {
        this.teamsApi.teamsNew(data).toPromise().then(data => {
          this.account = data;
          this.status.reload().then(() => this.alert.alert("success", "You've created team " + this.status.team.name + "."));
        }, error => {
          if (error.status === 409) this.alert.alert("error", "This team already exists.");
          else this.alert.alert("error", "We couldn't create your team.");
        });
    }

    do_join(data: any) : void {
        this.teamsApi.teamsJoin(data).toPromise().then(data => {
            this.account = data;
            this.status.reload().then(() => this.alert.alert("success", "You've joined team " + this.status.team.name + "."));
        }, error => {
          if (error.status === 409) this.alert.alert("error", "This team is already full.");
          else this.alert.alert("error", "You couldn't join this team.");
        });
    }
}
