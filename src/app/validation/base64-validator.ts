import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvBase64Validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: Base64ValidatorDirective, multi: true }],

})
export class Base64ValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvBase64Validator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

              this.isValid = validator.isBase64(value);

    const message = {
      'base64Validator': {
        'param': this.nfvBase64Validator
      }
    };
    return this.isValid ? null : message;
  }

}
