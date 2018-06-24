import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[mongoIdValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MongoIdValidatorDirective, multi: true }],
  
})
export class MongoIdValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() mongoIdValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isMongoId(value);
    
    const message = {
      'mongoIdValidator': {
        'param': this.mongoIdValidator
      }
    };
    return this.isValid ? null : message;
  }

}
