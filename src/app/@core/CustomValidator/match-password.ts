import { Validator, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup) {
    const { password, ConfirmPassword } = formGroup.value;
    if (password === ConfirmPassword) {
      // if password Match  Each Other
      return null;
    } else {
      // if password Dont Match Each Other

      return { passwordDontMatch: true };
    }
  }
}
