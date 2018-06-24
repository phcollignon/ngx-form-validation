import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[halfWidthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HalfWidthValidatorDirective, multi: true }],
  
})
export class HalfWidthValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() halfWidthValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isHalfWidth(value);
    
    const message = {
      'halfWidthValidator': {
        'param': this.halfWidthValidator
      }
    };
    return this.isValid ? null : message;
  }

}
