import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvUUIDValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UUIDValidatorDirective, multi: true }],

})
export class UUIDValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() nfvUUIDValidator: string ;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

          if (this.nfvUUIDValidator)  {

            const param: string = this.nfvUUIDValidator;
            this.isValid = validator.isUUID(value, param as 3|4|5|'3'|'4'|'5'|'all');

          } else {
              this.isValid = validator.isUUID(value);
         }
    const message = {
      'UUIDValidator': {
        'param': this.nfvUUIDValidator
      }
    };
    return this.isValid ? null : message;
  }

}
