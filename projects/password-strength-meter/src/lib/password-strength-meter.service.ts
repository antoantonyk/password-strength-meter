import { Injectable } from '@angular/core';

import * as zxcvbn from 'zxcvbn';

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
    console.log(result);
    return result.score;
  }

  /**
   * this will return the password strength score with feedback messages
   * return type { score: number; feedback: { suggestions: Array<string>; warning: string } }
   *
   * @param password
   */
  scoreWithFeedback(password): { score: number; feedback: { suggestions: Array<string>; warning: string } } {
    const result = zxcvbn(password);
    console.log(result);
    return { score: result.score, feedback: result.feedback };
  }
}
