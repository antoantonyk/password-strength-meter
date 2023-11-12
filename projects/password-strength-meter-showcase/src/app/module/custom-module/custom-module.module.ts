import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PasswordStrengthMeterComponent } from 'angular-password-strength-meter';
import { provideZxvbnServiceForPSM } from 'angular-password-strength-meter/zxcvbn';

import { CustomComponentComponent } from './custom-component/custom-component.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomComponentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomComponentComponent,
      },
    ]),
    FormsModule,
    PasswordStrengthMeterComponent,
  ],
  providers: [provideZxvbnServiceForPSM()],
})
export class CustomModuleModule {}
