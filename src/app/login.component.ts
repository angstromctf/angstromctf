import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersApi } from './api/api/api';
import { StatusService } from './status.service';
import { ModalService } from './modal.service';
import { AlertService } from './alert.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
    form: FormGroup;
    failed: boolean = false;

    constructor(private router: Router, private usersApi: UsersApi, private status: StatusService,
                private modalService: ModalService, private alertService: AlertService, private fb: FormBuilder) {
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    submit(value: any){
        this.status.login(value.username, value.password).then(() => {
          this.router.navigateByUrl('/');
          this.alertService.alert("Success!", "You've logged in.", "success");
          this.modalService.close();
        }, () => this.alertService.alert("Whoops.", "You couldn't be logged in. Wrong username or password?", "error"));
    }
}
