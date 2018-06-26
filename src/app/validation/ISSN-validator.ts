import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  HostBinding,
  Input
} from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  FormControl
} from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvISSNValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ISSNValidatorDirective, multi: true }
  ]
})
export class ISSNValidatorDirective implements Validator {
  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() nfvISSNValidator: string;
  @HostListener('input')
  onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);

    if (this.nfvISSNValidator) {
      const param: ValidatorJS.IsISSNOptions = JSON.parse(this.nfvISSNValidator);
      this.isValid = validator.isISSN(value, param);
    } else {
      this.isValid = validator.isISSN(value);
    }
    const message = {
      ISSNValidator: {
        param: this.nfvISSNValidator
      }
    };
    return this.isValid ? null : message;
  }
}
