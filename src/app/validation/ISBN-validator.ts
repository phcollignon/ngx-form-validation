import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[ISBNValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ISBNValidatorDirective, multi: true }],
  
})
export class ISBNValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() ISBNValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
          if(this.ISBNValidator)  {
            
            let param : string = this.ISBNValidator;
            let paramnumber : number = +param;
            this.isValid = validator.isISBN(value,paramnumber);
            
          } else {    
              this.isValid = validator.isISBN(value);
         } 
    const message = {
      'ISBNValidator': {
        'param': this.ISBNValidator
      }
    };
    return this.isValid ? null : message;
  }

}
