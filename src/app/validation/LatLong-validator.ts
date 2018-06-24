import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[latLongValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LatLongValidatorDirective, multi: true }],
  
})
export class LatLongValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() latLongValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isLatLong(value);
    
    const message = {
      'latLongValidator': {
        'param': this.latLongValidator
      }
    };
    return this.isValid ? null : message;
  }

}
