import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvDivisibleByValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DivisibleByValidatorDirective, multi: true }],

})
export class DivisibleByValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvDivisibleByValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.nfvDivisibleByValidator)  {

            const param: string = this.nfvDivisibleByValidator;
            const paramnumber: number = +param;
            this.isValid = validator.isDivisibleBy(value, paramnumber);

          }


    const message = {
      'divisibleByValidator': {
        'param': this.nfvDivisibleByValidator
      }
    };
    return this.isValid ? null : message;
  }

}
