/**
 * Logs the user in to the competition to answer problems.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../api/api/api';
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

  // Whether the last login failed
  failed: boolean = false;

  constructor(private router: Router, private usersService: UsersService, public status: StatusService,
              private modalService: ModalService, private alert: AlertService, private fb: FormBuilder) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Log the user in.
   * @param data - The form data the user submitted..
   */
  login(data: any){
    this.status.login(data.username, data.password).then(() => {
      this.alert.open("success", "You've logged in.");
      this.modalService.close();
      this.router.navigateByUrl('/');
    }, () => this.alert.open("error", "You couldn't be logged in. Wrong username or password?"));
  }
}
