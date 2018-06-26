import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[whitelistedValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: WhitelistedValidatorDirective, multi: true }],

})
export class WhitelistedValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() whitelistedValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.whitelistedValidator)  {

            const param: string = this.whitelistedValidator;
            this.isValid = validator.isWhitelisted(value, param);

          }


    const message = {
      'whitelistedValidator': {
        'param': this.whitelistedValidator
      }
    };
    return this.isValid ? null : message;
  }

}
