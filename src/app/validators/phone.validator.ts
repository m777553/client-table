import { AbstractControl } from '@angular/forms';

export const phonePatternValidation = (control: AbstractControl) => {
  if(!control.value){
    return null;
  }
  if (
    !/^\+7\d{10}$/.test(
      control.value,
    )
  ) {
    return { phonePatternInvalid: true };
  }

  return null;
};
