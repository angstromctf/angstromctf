import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersApi } from './api/api/api';
import { StatusService } from './status.service';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-login',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    failed: boolean = false;

    constructor(private titleService: Title, private router: Router, private usersApi: UsersApi, private status: StatusService, private fb: FormBuilder) {
        this.form = fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required],
        });
    }

    ngOnInit(): void {
        this.titleService.setTitle("Login | ångstromCTF");
    }

    submit(value: any){
        this.status.login(value.username, value.password).then(data => {
            console.log(data);
            if (data) this.router.navigateByUrl('/');
            else this.failed = true;
        });
    }
}
