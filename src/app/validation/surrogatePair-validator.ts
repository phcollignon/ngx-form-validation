import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[surrogatePairValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: SurrogatePairValidatorDirective, multi: true }],
  
})
export class SurrogatePairValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() surrogatePairValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isSurrogatePair(value);
    
    const message = {
      'surrogatePairValidator': {
        'param': this.surrogatePairValidator
      }
    };
    return this.isValid ? null : message;
  }

}
