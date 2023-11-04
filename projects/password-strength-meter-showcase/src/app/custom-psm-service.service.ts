import { Injectable } from '@angular/core';
import { IPasswordStrengthMeterService } from 'angular-password-strength-meter';

@Injectable()
export class CustomPsmServiceService extends IPasswordStrengthMeterService {
  score(password: string): number {
    console.log('Password', password);
    return 1;
  }

  scoreWithFeedback(password: string): {
    score: number;
    feedback: { warning: string; suggestions: string[] };
  } {
    console.log('CustomPsmServiceService', password);

    return { score: 1, feedback: { warning: '', suggestions: [] } };
  }
}
