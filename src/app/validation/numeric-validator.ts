import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvNumericValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NumericValidatorDirective, multi: true }],

})
export class NumericValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvNumericValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isNumeric(value);

    const message = {
      'numericValidator': {
        'param': this.nfvNumericValidator
      }
    };
    return this.isValid ? null : message;
  }

}
