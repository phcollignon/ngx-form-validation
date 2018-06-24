import { Directive, HostListener, ElementRef, Renderer, HostBinding, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import * as validator from 'validator'

@Directive({
  selector: '[variableWidthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: VariableWidthValidatorDirective, multi: true }],
  
})
export class VariableWidthValidatorDirective implements Validator {

  isValid: boolean = true;
 
  constructor(private el: ElementRef,private renderer: Renderer) { }

  @Input() variableWidthValidator: string ;
  @HostListener("input") onInput() {
    this.renderer.setElementClass(this.el.nativeElement, "is-invalid", !this.isValid);
  }

  validate(c: FormControl): ValidationErrors {
    const value = String(c.value);
    
              this.isValid = validator.isVariableWidth(value);
    
    const message = {
      'variableWidthValidator': {
        'param': this.variableWidthValidator
      }
    };
    return this.isValid ? null : message;
  }

}
