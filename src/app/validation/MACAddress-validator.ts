import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvMACAddressValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MACAddressValidatorDirective, multi: true }],

})
export class MACAddressValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvMACAddressValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

              this.isValid = validator.isMACAddress(value);

    const message = {
      'MACAddressValidator': {
        'param': this.nfvMACAddressValidator
      }
    };
    return this.isValid ? null : message;
  }

}
