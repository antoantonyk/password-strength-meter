import { Inject, Injectable, Optional } from '@angular/core';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import { IPasswordStrengthMeterService } from 'angular-password-strength-meter';
import { ZXCVBN_CONFIG, ZxvbnConfigType } from './password-strength-meter.types';


export const DEFAULT_CONFIG: ZxvbnConfigType = {
  translations: zxcvbnEnPackage.translations,
};

@Injectable()
export class PasswordStrengthMeterZXCVBNService extends IPasswordStrengthMeterService {
  constructor(
    @Optional()
    @Inject(ZXCVBN_CONFIG)
    options: ZxvbnConfigType
  ) {
    super();

    if (options) {
      zxcvbnOptions.setOptions(options);
    } else {
      zxcvbnOptions.setOptions(DEFAULT_CONFIG);
    }
  }

  /**
   *  this will return the password strength score in number
   *  0 - too guessable
   *  1 - very guessable
   *  2 - somewhat guessable
   *  3 - safely unguessable
   *  4 - very unguessable
   *
   *  @param password - Password
   */
  score(password): number {
    const result = zxcvbn(password);
    return result.score;
  }

  /**
   * this will return the password strength score with feedback messages
   * return type { score: number; feedback: { suggestions: string[]; warning: string } }
   *
   * @param password - Password
   */
  scoreWithFeedback(password): {
    score: number;
    feedback: { suggestions: string[]; warning: string };
  } {
    const result = zxcvbn(password);
    return { score: result.score, feedback: result.feedback };
  }
}
