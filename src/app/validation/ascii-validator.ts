import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[asciiValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AsciiValidatorDirective, multi: true }],

})
export class AsciiValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() asciiValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isAscii(value);

    const message = {
      'asciiValidator': {
        'param': this.asciiValidator
      }
    };
    return this.isValid ? null : message;
  }

}
