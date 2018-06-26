import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[hexColorValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HexColorValidatorDirective, multi: true }],

})
export class HexColorValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @Input() hexColorValidator: string ;
  @HostListener('input') onInput() {
    this.renderer.setElementClass(this.el.nativeElement, 'is-invalid', !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isHexColor(value);

    const message = {
      'hexColorValidator': {
        'param': this.hexColorValidator
      }
    };
    return this.isValid ? null : message;
  }

}
