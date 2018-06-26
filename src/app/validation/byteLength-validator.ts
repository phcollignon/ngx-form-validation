import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[byteLengthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ByteLengthValidatorDirective, multi: true }],

})
export class ByteLengthValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() byteLengthValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.byteLengthValidator)  {

            const param: ValidatorJS.IsByteLengthOptions = JSON.parse(this.byteLengthValidator);
            this.isValid = validator.isByteLength(value, param);

          }


    const message = {
      'byteLengthValidator': {
        'param': this.byteLengthValidator
      }
    };
    return this.isValid ? null : message;
  }

}
