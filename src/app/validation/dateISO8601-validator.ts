import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[ISO8601Validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ISO8601ValidatorDirective, multi: true }],
  
})
export class ISO8601ValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() ISO8601Validator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isISO8601(value);
    
    const message = {
      'ISO8601Validator': {
        'param': this.ISO8601Validator
      }
    };
    return this.isValid ? null : message;
  }

}
