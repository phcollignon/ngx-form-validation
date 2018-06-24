import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationModule } from './validation/validation.module';

@NgModule({
  declarations: [
    AppComponent,
    FormComponentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ValidationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
