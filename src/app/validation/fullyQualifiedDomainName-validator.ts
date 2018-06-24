import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[FQDNValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FQDNValidatorDirective, multi: true }],
  
})
export class FQDNValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() FQDNValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.FQDNValidator)  {
            
            let param : ValidatorJS.IsFQDNOptions = JSON.parse(this.FQDNValidator);
            this.isValid = validator.isFQDN(value,param);
            
          } else {    
              this.isValid = validator.isFQDN(value);
         } 
    const message = {
      'FQDNValidator': {
        'param': this.FQDNValidator
      }
    };
    return this.isValid ? null : message;
  }

}
