import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[multibyteValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MultibyteValidatorDirective, multi: true }],

})
export class MultibyteValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() multibyteValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isMultibyte(value);

    const message = {
      'multibyteValidator': {
        'param': this.multibyteValidator
      }
    };
    return this.isValid ? null : message;
  }

}
