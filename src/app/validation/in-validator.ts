import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvInValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InValidatorDirective, multi: true }],

})
export class InValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvInValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvInValidator)  {

            const param: any[] = JSON.parse(this.nfvInValidator);
            this.isValid = validator.isIn(value, param);

          }


    const message = {
      'inValidator': {
        'param': this.nfvInValidator
      }
    };
    return this.isValid ? null : message;
  }

}
