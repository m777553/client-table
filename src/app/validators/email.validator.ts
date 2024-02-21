import { AbstractControl } from '@angular/forms';

export const emailPatternValidation = (control: AbstractControl) => {
  if (!control.value) {
    return null;
  }
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
      control.value,
    )
  ) {
    return { emailPatternInvalid: true };
  }

  return null;
};
