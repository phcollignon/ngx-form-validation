import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[divisibleByValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DivisibleByValidatorDirective, multi: true }],
  
})
export class DivisibleByValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() divisibleByValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.divisibleByValidator)  {
            
            let param : string = this.divisibleByValidator;
            let paramnumber : number = +param;
            this.isValid = validator.isDivisibleBy(value,paramnumber);
            
          }   
        
    
    const message = {
      'divisibleByValidator': {
        'param': this.divisibleByValidator
      }
    };
    return this.isValid ? null : message;
  }

}
