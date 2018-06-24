import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[mimeTypeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MimeTypeValidatorDirective, multi: true }],
  
})
export class MimeTypeValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() mimeTypeValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isMimeType(value);
    
    const message = {
      'mimeTypeValidator': {
        'param': this.mimeTypeValidator
      }
    };
    return this.isValid ? null : message;
  }

}
