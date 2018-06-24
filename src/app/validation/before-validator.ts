import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[beforeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: BeforeValidatorDirective, multi: true }],
  
})
export class BeforeValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() beforeValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.beforeValidator)  {
            
            let param : string = this.beforeValidator;
            this.isValid = validator.isBefore(value,param);
            
          } else {    
              this.isValid = validator.isBefore(value);
         } 
    const message = {
      'beforeValidator': {
        'param': this.beforeValidator
      }
    };
    return this.isValid ? null : message;
  }

}
