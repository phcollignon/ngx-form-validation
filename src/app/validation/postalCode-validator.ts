import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[postalCodeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PostalCodeValidatorDirective, multi: true }],

})
export class PostalCodeValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() postalCodeValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.postalCodeValidator)  {

            const param: string = this.postalCodeValidator;
            this.isValid = validator.isPostalCode(value, param as ValidatorJS.PostalCodeLocale);

          }


    const message = {
      'postalCodeValidator': {
        'param': this.postalCodeValidator
      }
    };
    return this.isValid ? null : message;
  }

}
