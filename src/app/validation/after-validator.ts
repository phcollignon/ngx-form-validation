import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[afterValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AfterValidatorDirective, multi: true }],
  
})
export class AfterValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() afterValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.afterValidator)  {
            
            let param : string = this.afterValidator;
            this.isValid = validator.isAfter(value,param);
            
          } else {    
              this.isValid = validator.isAfter(value);
         } 
    const message = {
      'afterValidator': {
        'param': this.afterValidator
      }
    };
    return this.isValid ? null : message;
  }

}
