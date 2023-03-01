import { zxcvbn } from '@zxcvbn-ts/core';

export interface PasswordStrengthMeterModel {
  score: number,
  feedback?: {
    suggestions: string[];
    warning: string
  }
}

export abstract class PasswordStrengthMeterWrapper {
  abstract getResult(password: string): Promise<PasswordStrengthMeterModel> | PasswordStrengthMeterModel;
}


export class PasswordStrengthMeterJSONImpl extends PasswordStrengthMeterWrapper {
  getResult(password: string): PasswordStrengthMeterModel {
    return zxcvbn(password);
  }
}

export class PasswordStrengthMeterPromiseImpl extends PasswordStrengthMeterWrapper {
  getResult(password: string): Promise<PasswordStrengthMeterModel> {
    const result = zxcvbn(password);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ score: result.score, feedback: result.feedback });
      }, 300);
    });
  }
}
