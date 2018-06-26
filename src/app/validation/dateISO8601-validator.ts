import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvISO8601Validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ISO8601ValidatorDirective, multi: true }],

})
export class ISO8601ValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvISO8601Validator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isISO8601(value);

    const message = {
      'ISO8601Validator': {
        'param': this.nfvISO8601Validator
      }
    };
    return this.isValid ? null : message;
  }

}
