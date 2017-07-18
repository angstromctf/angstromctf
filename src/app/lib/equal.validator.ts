/**
 * A validator to check if two form controls have equal values.
 */

import { FormControl } from "@angular/forms";

export function validateEqual(match: string) {
  return (control: FormControl) => {
    let that = control.root.get(match);
    return that && that.value != control.value ? { validateEqual: { valid: false } } : null;
  };
}
