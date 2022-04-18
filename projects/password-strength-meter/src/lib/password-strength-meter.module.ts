import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PasswordStrengthMeterComponent } from "./password-strength-meter.component";
import { ProgressBarDirective } from "./progress-bar.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [PasswordStrengthMeterComponent, ProgressBarDirective],
  exports: [PasswordStrengthMeterComponent, ProgressBarDirective],
})
export class PasswordStrengthMeterModule {}
