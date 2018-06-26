import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[inValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InValidatorDirective, multi: true }],

})
export class InValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() inValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.inValidator)  {

            const param: any[] = JSON.parse(this.inValidator);
            this.isValid = validator.isIn(value, param);

          }


    const message = {
      'inValidator': {
        'param': this.inValidator
      }
    };
    return this.isValid ? null : message;
  }

}
