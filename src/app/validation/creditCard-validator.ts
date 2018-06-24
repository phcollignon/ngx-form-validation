import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[creditCardValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CreditCardValidatorDirective, multi: true }],
  
})
export class CreditCardValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() creditCardValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isCreditCard(value);
    
    const message = {
      'creditCardValidator': {
        'param': this.creditCardValidator
      }
    };
    return this.isValid ? null : message;
  }

}
