# NgxFormValidation

Set of Angular Template Model Form Validators 

## Installation

The project requires :
* bootstrap  : `npm install bootstrap@latest`
* validator.js : `npm install validator` `npm install @types/validator`

## Demo

You can have a look and test validators here :
[https://ngx-for-validation.stackblitz.io/](https://ngx-for-validation.stackblitz.io/)

## Usage 

```
<form #myform="ngForm" (ngSubmit)="myform.valid && onSubmit(myform)" novalidate>

    <div class="form-group">
      <label for="intValidator">Int Validator</label>
      <input type="text" name="intValidator" id="intValidator" #intValidator="ngModel" class="form-control" ngModel required intValidator
        placeholder="This field should be an integer.">
      <validation-errors [control]="intValidator"></validation-errors>
    </div>

    <div class="form-group">
      <label for="intValidator2">Int Min Max Validator</label>
      <input type="text" name="intValidator2" id="intValidator2" #intValidator2="ngModel" class="form-control" ngModel required
        intValidator='{ "min": 3, "max": 9}' placeholder="This field should be an integer in the range [3,9].">
      <validation-errors [control]="intValidator2"></validation-errors>
    </div>

    <div class="form-group">
      <label for="inValidator">In Validator</label>
      <input type="text" name="inValidator" id="inValidator" #inValidator="ngModel" class="form-control" ngModel required inValidator='["one", "two"]'
        placeholder="This field should be in a array of allowed values ['one', 'two'].">
      <validation-errors [control]="inValidator"></validation-errors>
    </div>

    <button type="submit" [disabled]="!myform.valid" class="btn btn-primary">Submit</button>
    <button type="reset" class="btn btn-sm btn-danger"><i class="fa fa-ban"></i> Reset</button>

</form>
```
For other usage examples, loot at the [demo](https://ngx-for-validation.stackblitz.io/) or [`form.component.html`](https://github.com/Philippe-Collignon/ngx-form-validation/src/app/form/form.component.html) source code.

## Validator.js

Ngx Angular Form Validation is based on Validator.js
For advanced options, please look to [Validator.js documentation :](https://github.com/chriso/validator.js)

## Show Error component

The Show Error component is based on this excellent [Angular 4 Forms Validation article : ](https://www.toptal.com/angular-js/angular-4-forms-validation)