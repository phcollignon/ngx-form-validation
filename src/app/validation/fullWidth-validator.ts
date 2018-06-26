import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[fullWidthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FullWidthValidatorDirective, multi: true }],

})
export class FullWidthValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() fullWidthValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isFullWidth(value);

    const message = {
      'fullWidthValidator': {
        'param': this.fullWidthValidator
      }
    };
    return this.isValid ? null : message;
  }

}
