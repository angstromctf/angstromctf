/* Adapted from http://almerosteyn.com/2016/03/angular2-form-validation-component */

import { Component, OnChanges, Input } from "@angular/core";

export const MESSAGES: any = {
    required: "This field is required."
};

@Component({
    selector: 'extended-input',
    template: `<div class="form-group" [ngClass]="{ 'has-danger': message && touched, 'has-success': !message && touched }"> 
                    <label class="control-label"> {{ label }}</label>
                    <ng-content></ng-content>
                    <div class="form-control-feedback" *ngIf="message && touched">{{ message }}</div>
                </div>`
})
export class ExtendedInputComponent implements OnChanges {
    @Input()
    label: string = '';

    @Input()
    errors: boolean[];

    @Input()
    touched: boolean = true;

    message: string = '';

    ngOnChanges(changes: any) : void {
        if (changes.errors && changes.errors.currentValue) {
            this.message = '';

            Object.keys(changes.errors.currentValue).some(key => {
                if (changes.errors.currentValue[key] && MESSAGES[key]) {
                    this.message = MESSAGES[key];
                    return true;
                }
            });
        }
    }
}