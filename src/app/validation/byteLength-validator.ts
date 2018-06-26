import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvByteLengthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ByteLengthValidatorDirective, multi: true }],

})
export class ByteLengthValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvByteLengthValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.nfvByteLengthValidator)  {

            const param: ValidatorJS.IsByteLengthOptions = JSON.parse(this.nfvByteLengthValidator);
            this.isValid = validator.isByteLength(value, param);

          }


    const message = {
      'byteLengthValidator': {
        'param': this.nfvByteLengthValidator
      }
    };
    return this.isValid ? null : message;
  }

}
