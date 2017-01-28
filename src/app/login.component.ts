import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersApi } from './api/api/api';
import { StatusService } from './status.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
    form: FormGroup;
    failed: boolean = false;

    constructor(private router: Router, private usersApi: UsersApi, private status: StatusService, private fb: FormBuilder) {
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    submit(value: any){
        this.status.login(value.username, value.password).then(data => {
            if (data) this.router.navigateByUrl('/');
            else this.failed = true;
        });
    }
}
