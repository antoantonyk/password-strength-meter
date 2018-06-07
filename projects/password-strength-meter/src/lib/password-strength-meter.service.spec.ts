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
});
