import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PasswordStrengthMeterModule } from 'password-strength-meter';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, PasswordStrengthMeterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
