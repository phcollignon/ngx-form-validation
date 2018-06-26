import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[emailAndGmailValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailAndGmailValidatorDirective, multi: true }],

})
export class EmailAndGmailValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() emailAndGmailValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.emailAndGmailValidator)  {

            const param: ValidatorJS.IsEmailOptions = JSON.parse(this.emailAndGmailValidator);
            this.isValid = validator.isEmail(value, param);

          } else {
              this.isValid = validator.isEmail(value);
         }
    const message = {
      'emailAndGmailValidator': {
        'param': this.emailAndGmailValidator
      }
    };
    return this.isValid ? null : message;
  }

}
