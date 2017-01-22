/* Adapted from http://almerosteyn.com/2016/03/angular2-form-validation-component */

import { Component, OnChanges, Input } from "@angular/core";

export const MESSAGES: any = {
  required: "This field is required.",
  other: "An error occurred processing this field."
};

@Component({
  selector: 'extended-input',
  template: `<div class="form-group" [ngClass]="{ 'input-error': message && touched, 'input-valid': !message && touched }"> 
                    <label class="control-label"> {{ label }}</label>
                    <ng-content></ng-content>
                    <div class="form-error" *ngIf="message && touched">{{ message }}</div>
                </div>`
})
export class ExtendedInputComponent implements OnChanges {
    @Input()
    label: string;

    @Input()
    errors: boolean[];

    @Input()
    touched: boolean;

    message: string = '';

    ngOnChanges(changes: any) : void {
        if (changes.errors) {
            this.message = '';

            if (changes.errors.currentValue) {
                Object.keys(changes.errors.currentValue).some(key => {
                    if (changes.errors.currentValue[key]) {
                        if (MESSAGES[key]) this.message = MESSAGES[key];
                        else this.message = MESSAGES['other'];
                        return true;
                    }
                });
            }
        }
    }
}
