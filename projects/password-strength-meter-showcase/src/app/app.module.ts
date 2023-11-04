import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { DEFAULT_PSM_OPTIONS } from 'angular-password-strength-meter/zxcvbn';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule.forRoot(DEFAULT_PSM_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
