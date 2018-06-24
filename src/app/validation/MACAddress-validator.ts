import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[MACAddressValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MACAddressValidatorDirective, multi: true }],
  
})
export class MACAddressValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() MACAddressValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isMACAddress(value);
    
    const message = {
      'MACAddressValidator': {
        'param': this.MACAddressValidator
      }
    };
    return this.isValid ? null : message;
  }

}
