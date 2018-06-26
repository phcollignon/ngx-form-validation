import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[ISRCValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ISRCValidatorDirective, multi: true }],

})
export class ISRCValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() ISRCValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isISRC(value);

    const message = {
      'ISRCValidator': {
        'param': this.ISRCValidator
      }
    };
    return this.isValid ? null : message;
  }

}
