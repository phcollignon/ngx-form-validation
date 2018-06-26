import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[decimalValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DecimalValidatorDirective, multi: true }],

})
export class DecimalValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() decimalValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.decimalValidator)  {

            const param: ValidatorJS.IsDecimalOptions = JSON.parse(this.decimalValidator);
            this.isValid = validator.isDecimal(value, param);

          } else {
              this.isValid = validator.isDecimal(value);
         }
    const message = {
      'decimalValidator': {
        'param': this.decimalValidator
      }
    };
    return this.isValid ? null : message;
  }

}
