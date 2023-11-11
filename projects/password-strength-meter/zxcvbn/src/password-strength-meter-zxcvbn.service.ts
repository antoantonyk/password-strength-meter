import { Inject, Injectable, Optional } from '@angular/core';
import { zxcvbn, zxcvbnAsync, zxcvbnOptions } from '@zxcvbn-ts/core';
import { translations } from '@zxcvbn-ts/language-en';
import {
  FeedbackResult,
  IPasswordStrengthMeterService,
} from 'angular-password-strength-meter';
import {
  ZXCVBN_CONFIG,
  ZxvbnConfigType,
} from './password-strength-meter.types';

export const DEFAULT_CONFIG: ZxvbnConfigType = {
  translations: translations,
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
  score(password: string): number {
    const result = zxcvbn(password);
    return result.score;
  }

  /**
   * this will return the password strength score with feedback messages
   * return type FeedbackResult
   *
   * @param password - Password
   */
  scoreWithFeedback(password: string): FeedbackResult {
    const result = zxcvbn(password);
    return { score: result.score, feedback: result.feedback };
  }

  async scoreAsync(password: string): Promise<number> {
    const result = await zxcvbnAsync(password);
    return result.score;
  }

  async scoreWithFeedbackAsync(password: string): Promise<FeedbackResult> {
    const result = await zxcvbnAsync(password);
    return { score: result.score, feedback: result.feedback };
  }
}
