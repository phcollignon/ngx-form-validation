import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvFloatValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FloatValidatorDirective, multi: true }],

})
export class FloatValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvFloatValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvFloatValidator)  {

            const param: ValidatorJS.IsFloatOptions = JSON.parse(this.nfvFloatValidator);
            this.isValid = validator.isFloat(value, param);

          } else {
              this.isValid = validator.isFloat(value);
         }
    const message = {
      'floatValidator': {
        'param': this.nfvFloatValidator
      }
    };
    return this.isValid ? null : message;
  }

}
