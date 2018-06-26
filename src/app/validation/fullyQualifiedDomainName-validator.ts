import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvFQDNValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FQDNValidatorDirective, multi: true }],

})
export class FQDNValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvFQDNValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.nfvFQDNValidator)  {

            const param: ValidatorJS.IsFQDNOptions = JSON.parse(this.nfvFQDNValidator);
            this.isValid = validator.isFQDN(value, param);

          } else {
              this.isValid = validator.isFQDN(value);
         }
    const message = {
      'FQDNValidator': {
        'param': this.nfvFQDNValidator
      }
    };
    return this.isValid ? null : message;
  }

}
