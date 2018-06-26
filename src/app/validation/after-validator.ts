import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvAfterValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AfterValidatorDirective, multi: true }],

})
export class AfterValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvAfterValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvAfterValidator)  {

            const param: string = this.nfvAfterValidator;
            this.isValid = validator.isAfter(value, param);

          } else {
              this.isValid = validator.isAfter(value);
         }
    const message = {
      'afterValidator': {
        'param': this.nfvAfterValidator
      }
    };
    return this.isValid ? null : message;
  }

}
