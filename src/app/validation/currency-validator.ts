import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvCurrencyValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CurrencyValidatorDirective, multi: true }],

})
export class CurrencyValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvCurrencyValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvCurrencyValidator)  {

            const param: ValidatorJS.IsCurrencyOptions = JSON.parse(this.nfvCurrencyValidator);
            this.isValid = validator.isCurrency(value, param);

          } else {
              this.isValid = validator.isCurrency(value);
         }
    const message = {
      'currencyValidator': {
        'param': this.nfvCurrencyValidator
      }
    };
    return this.isValid ? null : message;
  }

}
