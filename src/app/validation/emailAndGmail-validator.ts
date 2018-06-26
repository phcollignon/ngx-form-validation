import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvEmailAndGmailValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailAndGmailValidatorDirective, multi: true }],

})
export class EmailAndGmailValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvEmailAndGmailValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

          if (this.nfvEmailAndGmailValidator)  {

            const param: ValidatorJS.IsEmailOptions = JSON.parse(this.nfvEmailAndGmailValidator);
            this.isValid = validator.isEmail(value, param);

          } else {
              this.isValid = validator.isEmail(value);
         }
    const message = {
      'emailAndGmailValidator': {
        'param': this.nfvEmailAndGmailValidator
      }
    };
    return this.isValid ? null : message;
  }

}
