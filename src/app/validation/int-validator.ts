import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[intValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IntValidatorDirective, multi: true }],

})
export class IntValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() intValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.intValidator)  {

            const param: ValidatorJS.IsIntOptions = JSON.parse(this.intValidator);
            this.isValid = validator.isInt(value, param);

          } else {
              this.isValid = validator.isInt(value);
         }
    const message = {
      'intValidator': {
        'param': this.intValidator
      }
    };
    return this.isValid ? null : message;
  }

}
