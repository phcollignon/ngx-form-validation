import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvAlphaValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AlphaValidatorDirective, multi: true }],

})
export class AlphaValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() alphaValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.alphaValidator)  {

            const param: string = this.alphaValidator;
            this.isValid = validator.isAlpha(value, param as ValidatorJS.AlphaLocale);

          } else {
              this.isValid = validator.isAlpha(value);
         }
    const message = {
      'alphaValidator': {
        'param': this.alphaValidator
      }
    };
    return this.isValid ? null : message;
  }

}
