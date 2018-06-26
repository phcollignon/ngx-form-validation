import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'nfv-validation-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent {
  private static readonly errorMessages: any  = {
    required: (params: any) => 'This field is required',
    minlength: (params: any) =>
      'The min number of characters is ' + params.requiredLength,
    maxlength: (params: any) =>
      'The max allowed number of characters is ' + params.requiredLength,
    pattern: (params: any) =>
      'The required pattern is: ' + params.requiredPattern,
    email: (params: any) => 'This field should be valid email address. ',
    afterValidator: (params: any) =>
      'This field should be a date that\'s after the specified date ' +
      params.param,
    alphaValidator: (params: any) =>
      'This field should contain only letters (a-zA-Z). ' + params.param,
    alphanumericValidator: (params: any) =>
      'This field should contain only letters and numbers ' + params.param,
    asciiValidator: (params: any) =>
      'This field should contain ASCII chars only. ' + params.param,
    base64Validator: (params: any) =>
      'This field should be base64 encoded. ' + params.param,
    beforeValidator: (params: any) =>
      'This field should be a date that\'s before the specified date. ' +
      params.param,
    booleanValidator: (params: any) =>
      'This field should be a boolean. ' + params.param,
    byteLengthValidator: (params: any) =>
      'This field\'s length (in UTF-8 bytes) should fall in a range. ' +
      params.param,
    creditCardValidator: (params: any) =>
      'This field should be a credit card number. ' + params.param,
    currencyValidator: (params: any) =>
      'This field should be a valid currency amount. ' + params.param,
    dataURIValidator: (params: any) =>
      'This field should be a data uri format. ' + params.param,
    decimalValidator: (params: any) =>
      'This field should be a decimal number ' + params.param,
    divisibleByValidator: (params: any) =>
      'This field should be a number that\'s divisible by the specified number. ' +
      params.param,
    emailAndGmailValidator: (params: any) =>
      'This field should be valid email address. ' + params.param,
    emptyValidator: (params: any) =>
      'This field should has a length of zero. ' + params.param,
    FQDNValidator: (params: any) =>
      'This field should be a fully qualified domain name (e.g. domain.com). ' +
      params.param,
    floatValidator: (params: any) =>
      'This field should be a float. ' + params.param,
    fullWidthValidator: (params: any) =>
      'This field should contain any full-width chars. ' + params.param,
    halfWidthValidator: (params: any) =>
      'This field should contain any half-width chars. ' + params.param,
    hashValidator: (params: any) =>
      'This field should be a hash of type algorithm. ' + params.param,
    hexColorValidator: (params: any) =>
      'This field should be a hexadecimal color. ' + params.param,
    hexadecimalValidator: (params: any) =>
      'This field should be a hexadecimal number. ' + params.param,
    IPValidator: (params: any) =>
      'This field should be an IP address ' + params.param,
    ISBNValidator: (params: any) =>
      'This field should be an ISBN. ' + params.param,
    ISSNValidator: (params: any) =>
      'This field should be an ISSN. ' + params.param,
    ISINValidator: (params: any) =>
      'This field should be an ISIN (stock/security identifier). ' +
      params.param,
    ISO8601Validator: (params: any) =>
      'This field should be a valid ISO 8601 date. ' + params.param,
    ISO31661Alpha2Validator: (params: any) =>
      'This field should be a valid ISO 3166-1 alpha-2 officially assigned country code. ' +
      params.param,
    ISRCValidator: (params: any) =>
      'This field should be a ISRC. ' + params.param,
    inValidator: (params: any) =>
      'This field should be in a array of allowed values. ' + params.param,
    intValidator: (params: any) =>
      'This field should be an integer. ' + params.param,
    JSONValidator: (params: any) =>
      'This field should be valid JSON. ' + params.param,
    latLongValidator: (params: any) =>
      'This field should be a valid latitude-longitude coordinate in the format lat,long or lat, long. ' +
      params.param,
    lengthValidator: (params: any) =>
      'This field\'s length should fall in a range. ' + params.param,
    lowercaseValidator: (params: any) =>
      'This field should be lowercase. ' + params.param,
    MACAddressValidator: (params: any) =>
      'This field should be a MAC address. ' + params.param,
    MD5Validator: (params: any) =>
      'This field should be a MD5 hash. ' + params.param,
    mimeTypeValidator: (params: any) =>
      'This field should matches to a valid MIME type format. ' + params.param,

    mongoIdValidator: (params: any) =>
      'This field should be a valid hex-encoded representation of a MongoDB ObjectId. ' +
      params.param,
    multibyteValidator: (params: any) =>
      'This field should contain one or more multibyte chars. ' + params.param,
    numericValidator: (params: any) =>
      'This field should contain only numbers. ' + params.param,
    portValidator: (params: any) =>
      'This field should be a valid port number. ' + params.param,
    postalCodeValidator: (params: any) =>
      'This field should be a postal code. ' + params.param,
    surrogatePairValidator: (params: any) =>
      'This field should contain any surrogate pairs chars. ' + params.param,
    URLValidator: (params: any) =>
      'This field should be an URL. ' + params.param,
    UUIDValidator: (params: any) =>
      'This field should be a UUID. ' + params.param,
    uppercaseValidator: (params: any) =>
      'This field should be uppercase. ' + params.param,
    variableWidthValidator: (params: any) =>
      'This field should contain a mixture of full and half-width chars. ' +
      params.param,
    whitelistedValidator: (params: any) =>
      'This field should have characters that appear in the whitelist. ' +
      params.param
  };

  @Input() private control!: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean | null {
    return (
      this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    );
  }

  listOfErrors(): string[] {
    if (this.control !== null && this.control.errors !== null) {
      return Object.keys(this.control.errors).map((field: string) => {
        if (this.control.errors) {
          return this.getMessage(field, this.control.errors[field]);
        } else {
          return '';
        }
      });
    } else {
      return [];
    }
  }

  private getMessage(type: string, params: any) {
    return ErrorsComponent.errorMessages[type](params);
  }
}
