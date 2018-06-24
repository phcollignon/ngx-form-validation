import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[dataURIValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DataURIValidatorDirective, multi: true }],
  
})
export class DataURIValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() dataURIValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isDataURI(value);
    
    const message = {
      'dataURIValidator': {
        'param': this.dataURIValidator
      }
    };
    return this.isValid ? null : message;
  }

}
