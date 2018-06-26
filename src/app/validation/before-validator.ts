import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvBeforeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: BeforeValidatorDirective, multi: true }],

})
export class BeforeValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvBeforeValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvBeforeValidator)  {

            const param: string = this.nfvBeforeValidator;
            this.isValid = validator.isBefore(value, param);

          } else {
              this.isValid = validator.isBefore(value);
         }
    const message = {
      'beforeValidator': {
        'param': this.nfvBeforeValidator
      }
    };
    return this.isValid ? null : message;
  }

}
