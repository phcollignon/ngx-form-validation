import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[UUIDValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UUIDValidatorDirective, multi: true }],
  
})
export class UUIDValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() UUIDValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.UUIDValidator)  {
            
            let param : string = this.UUIDValidator;
            this.isValid = validator.isUUID(value,param as 3|4|5|"3"|"4"|"5"|"all");
            
          } else {    
              this.isValid = validator.isUUID(value);
         } 
    const message = {
      'UUIDValidator': {
        'param': this.UUIDValidator
      }
    };
    return this.isValid ? null : message;
  }

}
