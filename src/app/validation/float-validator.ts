import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[floatValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FloatValidatorDirective, multi: true }],

})
export class FloatValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() floatValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.floatValidator)  {

            const param: ValidatorJS.IsFloatOptions = JSON.parse(this.floatValidator);
            this.isValid = validator.isFloat(value, param);

          } else {
              this.isValid = validator.isFloat(value);
         }
    const message = {
      'floatValidator': {
        'param': this.floatValidator
      }
    };
    return this.isValid ? null : message;
  }

}
