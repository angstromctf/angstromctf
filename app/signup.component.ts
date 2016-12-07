import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-signup',
    templateUrl: 'signup.component.html',
})
export class SignupComponent implements OnInit {
    form: FormGroup;

    genders = ['', 'Female', 'Male', 'Non-binary', 'Prefer not to say'];
    races = [''];

    constructor(private titleService: Title, private fb: FormBuilder) {
        this.form = fb.group({
            username: [null, Validators.required],
            password: [null, Validators.required],
            confirm_password: [null, Validators.required],
            first_name: [null, Validators.required],
            last_name: [null, Validators.required],

            eligible: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.titleService.setTitle("Signup | ångstromCTF");
    }
}
