import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { emailPatternValidation } from './email.validator';

@Directive({
  selector: '[emailPatternValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailPatternValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailPatternValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return emailPatternValidation(control);
  }
}
