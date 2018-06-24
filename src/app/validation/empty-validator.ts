import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[emptyValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmptyValidatorDirective, multi: true }],
  
})
export class EmptyValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() emptyValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isEmpty(value);
    
    const message = {
      'emptyValidator': {
        'param': this.emptyValidator
      }
    };
    return this.isValid ? null : message;
  }

}