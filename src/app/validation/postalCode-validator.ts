import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvPostalCodeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PostalCodeValidatorDirective, multi: true }],

})
export class PostalCodeValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvPostalCodeValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvPostalCodeValidator)  {

            const param: string = this.nfvPostalCodeValidator;
            this.isValid = validator.isPostalCode(value, param as ValidatorJS.PostalCodeLocale);

          }


    const message = {
      'postalCodeValidator': {
        'param': this.nfvPostalCodeValidator
      }
    };
    return this.isValid ? null : message;
  }

}
