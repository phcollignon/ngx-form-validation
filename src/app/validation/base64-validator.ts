import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[base64Validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: Base64ValidatorDirective, multi: true }],

})
export class Base64ValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() base64Validator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isBase64(value);

    const message = {
      'base64Validator': {
        'param': this.base64Validator
      }
    };
    return this.isValid ? null : message;
  }

}
