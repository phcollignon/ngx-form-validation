import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[JSONValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: JSONValidatorDirective, multi: true }],

})
export class JSONValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() JSONValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isJSON(value);

    const message = {
      'JSONValidator': {
        'param': this.JSONValidator
      }
    };
    return this.isValid ? null : message;
  }

}
