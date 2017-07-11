import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersApi } from '../api/api/api';
import { StatusService } from '../utils/status.service';
import { ModalService } from '../utils/modal.service';
import { AlertService } from '../utils/alert.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'angstrom-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
    form: FormGroup;
    failed: boolean = false;

    constructor(private router: Router, private usersApi: UsersApi, public status: StatusService,
                private modalService: ModalService, private alert: AlertService, private fb: FormBuilder) {
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    submit(value: any){
        this.status.login(value.username, value.password).then(() => {
          this.router.navigateByUrl('/');
          this.alert.alert("success", "You've logged in.");
          this.modalService.close();
        }, () => this.alert.alert("error", "You couldn't be logged in. Wrong username or password?"));
    }
}
