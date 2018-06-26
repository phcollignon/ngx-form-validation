import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvFullWidthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FullWidthValidatorDirective, multi: true }],

})
export class FullWidthValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvFullWidthValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

              this.isValid = validator.isFullWidth(value);

    const message = {
      'fullWidthValidator': {
        'param': this.nfvFullWidthValidator
      }
    };
    return this.isValid ? null : message;
  }

}
