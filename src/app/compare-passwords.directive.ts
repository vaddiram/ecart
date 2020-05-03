import { Directive ,Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

import { MustMatch } from './must-match.validator';
@Directive({
  selector: '[mustMatch]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ComparePasswordsDirective, multi: true }]
})
export class ComparePasswordsDirective implements Validator {
  @Input('mustMatch') mustMatch: string[] = [];
  constructor() { }
  validate(formGroup: FormGroup): ValidationErrors {
    return MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
}

}
