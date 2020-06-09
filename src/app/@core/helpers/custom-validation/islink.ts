import { FormControl, ValidationErrors } from '@angular/forms';

export const is_Poster = (fc: FormControl): ValidationErrors => {
  const posterValue = fc.value;
  const regEx = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi);
  if (posterValue == ' ') return null;
  if (!regEx.test(posterValue)) {
    return { isNotLink: true };
  }
};
