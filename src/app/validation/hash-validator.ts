import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[hashValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HashValidatorDirective, multi: true }],
  
})
export class HashValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() hashValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.hashValidator)  {
            
            let param : string = this.hashValidator;
            this.isValid = validator.isHash(value,param as ValidatorJS.HashAlgorithm);
            
          }   
        
    
    const message = {
      'hashValidator': {
        'param': this.hashValidator
      }
    };
    return this.isValid ? null : message;
  }

}
