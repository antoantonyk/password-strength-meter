import { Injectable } from '@angular/core';
import { IPasswordStrengthMeterService } from 'projects/password-strength-meter/src/public-api';
import { PasswordStrengthMeterModel } from '../../../password-strength-meter/src/lib/password-strength-meter.model';

@Injectable()
export class CustomPsmServiceService extends IPasswordStrengthMeterService {
  score(password: string): number {
    console.log('CustomPsmServiceService. Password: ', password);
    return 1;
  }

  scoreWithFeedback(password: string): PasswordStrengthMeterModel {
    console.log('CustomPsmServiceService. Password: ', password);

    return { score: 1, feedback: { warning: '', suggestions: [] } };
  }

  scoreWithFeedbackReactive(password: string): Promise<PasswordStrengthMeterModel> {
    console.log('CustomPsmServiceService. Password: ', password);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          { score: 1, feedback: { warning: '', suggestions: [] } }
        );
      }, 300);
    });
  };
}
