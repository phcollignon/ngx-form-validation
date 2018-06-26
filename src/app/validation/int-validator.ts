import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvIntValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IntValidatorDirective, multi: true }],

})
export class IntValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvIntValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.nfvIntValidator)  {

            const param: ValidatorJS.IsIntOptions = JSON.parse(this.nfvIntValidator);
            this.isValid = validator.isInt(value, param);

          } else {
              this.isValid = validator.isInt(value);
         }
    const message = {
      'intValidator': {
        'param': this.nfvIntValidator
      }
    };
    return this.isValid ? null : message;
  }

}
