import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[URLValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: URLValidatorDirective, multi: true }],

})
export class URLValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() URLValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.URLValidator)  {

            const param: ValidatorJS.IsURLOptions = JSON.parse(this.URLValidator);
            this.isValid = validator.isURL(value, param);

          } else {
              this.isValid = validator.isURL(value);
         }
    const message = {
      'URLValidator': {
        'param': this.URLValidator
      }
    };
    return this.isValid ? null : message;
  }

}
