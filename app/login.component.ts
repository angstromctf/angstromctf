import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'angstrom-login',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(private titleService: Title, private fb: FormBuilder) {
        this.form = fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required],
        });
    }

    ngOnInit(): void {
        // this.titleService.setTitle("Login | ångstromCTF");
    }

    submit(value: any){
        console.log(value);
    }
}
