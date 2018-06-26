import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvISO31661Alpha2Validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ISO31661Alpha2ValidatorDirective, multi: true }],

})
export class ISO31661Alpha2ValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvISO31661Alpha2Validator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isISO31661Alpha2(value);

    const message = {
      'ISO31661Alpha2Validator': {
        'param': this.nfvISO31661Alpha2Validator
      }
    };
    return this.isValid ? null : message;
  }

}
