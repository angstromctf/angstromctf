import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StatusService } from './status.service';
import { UsersApi, TeamsApi } from './api/api/api';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
    create: FormGroup;
    join: FormGroup;
    account: any;

    constructor(private titleService: Title, private usersApi: UsersApi, private teamsApi: TeamsApi, private status: StatusService, private fb: FormBuilder) {
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

        this.usersApi.usersAccount().toPromise().then(data => this.account = data);
    }
}
