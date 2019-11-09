import { TestBed, inject } from '@angular/core/testing';

import { PasswordStrengthMeterService } from './password-strength-meter.service';

describe('PasswordStrengthMeterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordStrengthMeterService]
    });
  });

  it('should be created', inject([PasswordStrengthMeterService], (service: PasswordStrengthMeterService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a number as score', inject(
    [PasswordStrengthMeterService],
    (service: PasswordStrengthMeterService) => {
      expect(service.score('aarasddasdsad')).toEqual(jasmine.any(Number));
    }
  ));

  it('should return a score and feedback', inject(
    [PasswordStrengthMeterService],
    (service: PasswordStrengthMeterService) => {
      const result = service.scoreWithFeedback('aarasddasdsad');
      expect(result).toEqual(jasmine.any(Object));
      expect(Object.keys(result)).toContain('score');
      expect(Object.keys(result)).toContain('feedback');
    }
  ));
});
