import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[portValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PortValidatorDirective, multi: true }],
  
})
export class PortValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() portValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isPort(value);
    
    const message = {
      'portValidator': {
        'param': this.portValidator
      }
    };
    return this.isValid ? null : message;
  }

}
