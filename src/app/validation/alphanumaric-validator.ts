import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[alphanumericValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AlphanumericValidatorDirective, multi: true }],

})
export class AlphanumericValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() alphanumericValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.alphanumericValidator)  {

            const param: string = this.alphanumericValidator;
            this.isValid = validator.isAlphanumeric(value, param as ValidatorJS.AlphanumericLocale);

          } else {
              this.isValid = validator.isAlphanumeric(value);
         }
    const message = {
      'alphanumericValidator': {
        'param': this.alphanumericValidator
      }
    };
    return this.isValid ? null : message;
  }

}
