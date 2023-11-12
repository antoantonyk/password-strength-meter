import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideZxvbnServiceForPSM } from 'angular-password-strength-meter/zxcvbn';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideZxvbnServiceForPSM()],
};
