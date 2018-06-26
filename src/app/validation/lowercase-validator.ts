import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvLowercaseValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LowercaseValidatorDirective, multi: true }],

})
export class LowercaseValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvLowercaseValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isLowercase(value);

    const message = {
      'lowercaseValidator': {
        'param': this.nfvLowercaseValidator
      }
    };
    return this.isValid ? null : message;
  }

}
