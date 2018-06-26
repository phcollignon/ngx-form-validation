import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[uppercaseValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UppercaseValidatorDirective, multi: true }],

})
export class UppercaseValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() uppercaseValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isUppercase(value);

    const message = {
      'uppercaseValidator': {
        'param': this.uppercaseValidator
      }
    };
    return this.isValid ? null : message;
  }

}
