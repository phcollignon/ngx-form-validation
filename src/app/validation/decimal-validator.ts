import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvDecimalValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DecimalValidatorDirective, multi: true }],

})
export class DecimalValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvDecimalValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvDecimalValidator)  {

            const param: ValidatorJS.IsDecimalOptions = JSON.parse(this.nfvDecimalValidator);
            this.isValid = validator.isDecimal(value, param);

          } else {
              this.isValid = validator.isDecimal(value);
         }
    const message = {
      'decimalValidator': {
        'param': this.nfvDecimalValidator
      }
    };
    return this.isValid ? null : message;
  }

}
