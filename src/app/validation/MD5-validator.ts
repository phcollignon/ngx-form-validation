import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[MD5Validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MD5ValidatorDirective, multi: true }],

})
export class MD5ValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() MD5Validator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isMD5(value);

    const message = {
      'MD5Validator': {
        'param': this.MD5Validator
      }
    };
    return this.isValid ? null : message;
  }

}
