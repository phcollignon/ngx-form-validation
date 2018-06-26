import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvMimeTypeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MimeTypeValidatorDirective, multi: true }],

})
export class MimeTypeValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvMimeTypeValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isMimeType(value);

    const message = {
      'mimeTypeValidator': {
        'param': this.nfvMimeTypeValidator
      }
    };
    return this.isValid ? null : message;
  }

}
