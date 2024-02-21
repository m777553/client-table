import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { phonePatternValidation } from './phone.validator';

@Directive({
  selector: '[phonePatternValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhonePatternValidatorDirective,
      multi: true,
    },
  ],
})
export class PhonePatternValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return phonePatternValidation(control);
  }
}
