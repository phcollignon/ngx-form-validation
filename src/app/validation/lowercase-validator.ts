import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[lowercaseValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LowercaseValidatorDirective, multi: true }],

})
export class LowercaseValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() lowercaseValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isLowercase(value);

    const message = {
      'lowercaseValidator': {
        'param': this.lowercaseValidator
      }
    };
    return this.isValid ? null : message;
  }

}
