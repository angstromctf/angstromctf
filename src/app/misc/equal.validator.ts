import { FormControl } from "@angular/forms";

export function validateEqual(match: string) {
  return (c: FormControl) => {
    let that = c.root.get(match);
    return that && that.value != c.value ? {
      validateEqual: {
        valid: false
      }
    } : null;
  };
}
