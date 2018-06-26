import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[numericValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NumericValidatorDirective, multi: true }],

})
export class NumericValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() numericValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isNumeric(value);

    const message = {
      'numericValidator': {
        'param': this.numericValidator
      }
    };
    return this.isValid ? null : message;
  }

}
