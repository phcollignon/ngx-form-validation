import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[ISSNValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ISSNValidatorDirective, multi: true }],
  
})
export class ISSNValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() ISSNValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.ISSNValidator)  {
            
            let param : ValidatorJS.IsISSNOptions = JSON.parse(this.ISSNValidator);
            this.isValid = validator.isISSN(value,param);
            
          } else {    
              this.isValid = validator.isISSN(value);
         } 
    const message = {
      'ISSNValidator': {
        'param': this.ISSNValidator
      }
    };
    return this.isValid ? null : message;
  }

}
