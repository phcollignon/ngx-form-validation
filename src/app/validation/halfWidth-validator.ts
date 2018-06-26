import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvHalfWidthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HalfWidthValidatorDirective, multi: true }],

})
export class HalfWidthValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvHalfWidthValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

              this.isValid = validator.isHalfWidth(value);

    const message = {
      'halfWidthValidator': {
        'param': this.nfvHalfWidthValidator
      }
    };
    return this.isValid ? null : message;
  }

}
