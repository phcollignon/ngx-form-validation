import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvURLValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: URLValidatorDirective, multi: true }],

})
export class URLValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvURLValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvURLValidator)  {

            const param: ValidatorJS.IsURLOptions = JSON.parse(this.nfvURLValidator);
            this.isValid = validator.isURL(value, param);

          } else {
              this.isValid = validator.isURL(value);
         }
    const message = {
      'URLValidator': {
        'param': this.nfvURLValidator
      }
    };
    return this.isValid ? null : message;
  }

}
