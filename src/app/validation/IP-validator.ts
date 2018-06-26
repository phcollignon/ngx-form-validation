import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[IPValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IPValidatorDirective, multi: true }],

})
export class IPValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() IPValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.IPValidator)  {

            const param: string = this.IPValidator;
            const paramnumber: number = +param;
            this.isValid = validator.isIP(value, paramnumber);

          } else {
              this.isValid = validator.isIP(value);
         }
    const message = {
      'IPValidator': {
        'param': this.IPValidator
      }
    };
    return this.isValid ? null : message;
  }

}
