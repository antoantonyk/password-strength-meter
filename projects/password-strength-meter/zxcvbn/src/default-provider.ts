import {
  EnvironmentProviders,
  Provider,
  makeEnvironmentProviders,
} from '@angular/core';
import {
  ZXCVBN_CONFIG,
  ZxvbnConfigType,
} from './password-strength-meter.types';
import { IPasswordStrengthMeterService } from 'angular-password-strength-meter';
import { PasswordStrengthMeterZXCVBNService } from './password-strength-meter-zxcvbn.service';

export function provideZxvbnServiceForPSM(
  config?: ZxvbnConfigType
): EnvironmentProviders {
  let providers: (EnvironmentProviders | Provider)[] = [
    {
      provide: IPasswordStrengthMeterService,
      useClass: PasswordStrengthMeterZXCVBNService,
    },
  ];

  if (config) {
    providers = [
      {
        provide: ZXCVBN_CONFIG,
        useValue: config,
      },
      ...providers,
    ];
  }

  return makeEnvironmentProviders(providers);
}
