import { Type } from '@angular/core';
import { IPasswordStrengthMeterService } from './password-strength-meter-service';

export type PSMOptions = {
  serviceClass: Type<IPasswordStrengthMeterService>;
};
