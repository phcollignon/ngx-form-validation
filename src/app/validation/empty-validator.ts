import { Directive, HostListener, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[nfvEmptyValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmptyValidatorDirective, multi: true }],

})
export class EmptyValidatorDirective implements Validator {

  isValid = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input()
  nfvEmptyValidator!: string;
  @HostListener('input') onInput() {
    if (!this.isValid) {
      this.renderer.addClass(this.el.nativeElement, 'is-invalid');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
    }
  }

  validate(c: FormControl): ValidationErrors | null {
    const value = String(c.value);

              this.isValid = validator.isEmpty(value);

    const message = {
      'emptyValidator': {
        'param': this.nfvEmptyValidator
      }
    };
    return this.isValid ? null : message;
  }

}
