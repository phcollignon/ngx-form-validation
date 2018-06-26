import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvISBNValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ISBNValidatorDirective, multi: true }],

})
export class ISBNValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvISBNValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.nfvISBNValidator)  {

            const param: string = this.nfvISBNValidator;
            const paramnumber: number = +param;
            this.isValid = validator.isISBN(value, paramnumber);

          } else {
              this.isValid = validator.isISBN(value);
         }
    const message = {
      'ISBNValidator': {
        'param': this.nfvISBNValidator
      }
    };
    return this.isValid ? null : message;
  }

}
