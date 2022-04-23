import { TestBed, inject } from '@angular/core/testing';

import { PasswordStrengthMeterService } from './password-strength-meter.service';
import { PSM_CONFIG } from './password-strength-meter.types';
import { zxcvbnOptions } from '@zxcvbn-ts/core';
import { OptionsType } from '@zxcvbn-ts/core/dist/types';

describe('PasswordStrengthMeterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordStrengthMeterService],
    });
  });

  it('should be created', inject(
    [PasswordStrengthMeterService],
    (service: PasswordStrengthMeterService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be created with custom config', inject(
    [PasswordStrengthMeterService],
    (service: PasswordStrengthMeterService) => {
      expect(service).toBeTruthy();
    }
  ));

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

describe('PasswordStrengthMeterService - Custom Config', () => {
  const customPSMOption = {};
  let zxcvbnOptionsSpyObject: jasmine.Spy<(options?: OptionsType) => void>;

  beforeEach(() => {
    zxcvbnOptionsSpyObject = spyOn(zxcvbnOptions, 'setOptions');
    TestBed.configureTestingModule({
      providers: [
        PasswordStrengthMeterService,
        { provide: PSM_CONFIG, useValue: customPSMOption },
      ],
    });
  });

  it('should be created with custom object', inject(
    [PasswordStrengthMeterService],
    (service: PasswordStrengthMeterService) => {
      expect(service).toBeTruthy();
      expect(zxcvbnOptionsSpyObject).toHaveBeenCalledWith(customPSMOption);
    }
  ));
});
