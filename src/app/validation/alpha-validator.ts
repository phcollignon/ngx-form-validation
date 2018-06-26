import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[alphaValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AlphaValidatorDirective, multi: true }],

})
export class AlphaValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() alphaValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.alphaValidator)  {

            const param: string = this.alphaValidator;
            this.isValid = validator.isAlpha(value, param as ValidatorJS.AlphaLocale);

          } else {
              this.isValid = validator.isAlpha(value);
         }
    const message = {
      'alphaValidator': {
        'param': this.alphaValidator
      }
    };
    return this.isValid ? null : message;
  }

}
