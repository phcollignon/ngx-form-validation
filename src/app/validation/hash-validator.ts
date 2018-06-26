import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvHashValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HashValidatorDirective, multi: true }],

})
export class HashValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvHashValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvHashValidator)  {

            const param: string = this.nfvHashValidator;
            this.isValid = validator.isHash(value, param as ValidatorJS.HashAlgorithm);

          }


    const message = {
      'hashValidator': {
        'param': this.nfvHashValidator
      }
    };
    return this.isValid ? null : message;
  }

}
