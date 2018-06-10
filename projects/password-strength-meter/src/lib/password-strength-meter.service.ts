import { Injectable } from '@angular/core';

import * as zxcvbn_ from 'zxcvbn';

const zxcvbn = zxcvbn_;

@Injectable()
export class PasswordStrengthMeterService {
  constructor() {}

  /**
   *  this will return the password strength score in number
   *  0 - too guessable
   *  1 - very guessable
   *  2 - somewhat guessable
   *  3 - safely unguessable
   *  4 - very unguessable
   *
   *  @param password
   */
  score(password): number {
    const result = zxcvbn(password);
    return result.score;
  }

  /**
   * this will return the password strength score with feedback messages
   * return type { score: number; feedback: { suggestions: string[]; warning: string } }
   *
   * @param password
   */
  scoreWithFeedback(password): { score: number; feedback: { suggestions: string[]; warning: string } } {
    const result = zxcvbn(password);
    return { score: result.score, feedback: result.feedback };
  }
}
