import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[ISINValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ISINValidatorDirective, multi: true }],

})
export class ISINValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() ISINValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isISIN(value);

    const message = {
      'ISINValidator': {
        'param': this.ISINValidator
      }
    };
    return this.isValid ? null : message;
  }

}
