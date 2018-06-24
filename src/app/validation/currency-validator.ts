import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[currencyValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CurrencyValidatorDirective, multi: true }],
  
})
export class CurrencyValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() currencyValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.currencyValidator)  {
            
            let param : ValidatorJS.IsCurrencyOptions = JSON.parse(this.currencyValidator);
            this.isValid = validator.isCurrency(value,param);
            
          } else {    
              this.isValid = validator.isCurrency(value);
         } 
    const message = {
      'currencyValidator': {
        'param': this.currencyValidator
      }
    };
    return this.isValid ? null : message;
  }

}
