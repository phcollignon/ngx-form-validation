import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvHexadecimalValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HexadecimalValidatorDirective, multi: true }],

})
export class HexadecimalValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvHexadecimalValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

              this.isValid = validator.isHexadecimal(value);

    const message = {
      'hexadecimalValidator': {
        'param': this.nfvHexadecimalValidator
      }
    };
    return this.isValid ? null : message;
  }

}
