import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordStrengthMeterComponent } from './password-strength-meter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PasswordStrengthMeterComponent],
  exports: [PasswordStrengthMeterComponent]
})
export class PasswordStrengthMeterModule {}
