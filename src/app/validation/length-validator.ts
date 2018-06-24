import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[lengthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LengthValidatorDirective, multi: true }],
  
})
export class LengthValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() lengthValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.lengthValidator)  {
            
            let param : ValidatorJS.IsLengthOptions = JSON.parse(this.lengthValidator);
            this.isValid = validator.isLength(value,param);
            
          }   
        
    
    const message = {
      'lengthValidator': {
        'param': this.lengthValidator
      }
    };
    return this.isValid ? null : message;
  }

}
