import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordStrengthMeterComponent } from './password-strength-meter.component';
import { PSMProgressBarDirective } from './psm-progress-bar.directive';
import { PSMOptions } from './psm-options';
import { IPasswordStrengthMeterService } from './password-strength-meter-service';

@NgModule({
  imports: [CommonModule],
  declarations: [PasswordStrengthMeterComponent, PSMProgressBarDirective],
  exports: [PasswordStrengthMeterComponent, PSMProgressBarDirective],
})
export class PasswordStrengthMeterModule {
  static forRoot({
    serviceClass,
  }: PSMOptions): ModuleWithProviders<PasswordStrengthMeterModule> {
    return {
      ngModule: PasswordStrengthMeterModule,
      providers: [
        {
          provide: IPasswordStrengthMeterService,
          useClass: serviceClass,
        },
      ],
    };
  }

  static forChild(): ModuleWithProviders<PasswordStrengthMeterModule> {
    return {
      ngModule: PasswordStrengthMeterModule,
    };
  }
}
