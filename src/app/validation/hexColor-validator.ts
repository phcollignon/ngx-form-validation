import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvHexColorValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HexColorValidatorDirective, multi: true }],

})
export class HexColorValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvHexColorValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isHexColor(value);

    const message = {
      'hexColorValidator': {
        'param': this.nfvHexColorValidator
      }
    };
    return this.isValid ? null : message;
  }

}
