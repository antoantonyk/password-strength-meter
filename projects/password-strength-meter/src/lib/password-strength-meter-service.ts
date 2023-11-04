export abstract class IPasswordStrengthMeterService {
    abstract score(password: string): number;
  
    abstract scoreWithFeedback(password: string): {
      score: number;
      feedback: { warning: string; suggestions: string[] };
    };
  }