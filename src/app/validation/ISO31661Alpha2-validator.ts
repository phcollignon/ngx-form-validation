import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[ISO31661Alpha2Validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ISO31661Alpha2ValidatorDirective, multi: true }],
  
})
export class ISO31661Alpha2ValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() ISO31661Alpha2Validator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isISO31661Alpha2(value);
    
    const message = {
      'ISO31661Alpha2Validator': {
        'param': this.ISO31661Alpha2Validator
      }
    };
    return this.isValid ? null : message;
  }

}
