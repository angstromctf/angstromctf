import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersApi } from './api/api/api';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-login',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(private titleService: Title, private usersApi: UsersApi, private fb: FormBuilder) {
        this.form = fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required],
        });
    }

    ngOnInit(): void {
        this.titleService.setTitle("Login | ångstromCTF");
    }

    submit(value: any){
        this.usersApi.usersAccount().toPromise().then(data => console.log(data), data => console.log(data));
    }
}
