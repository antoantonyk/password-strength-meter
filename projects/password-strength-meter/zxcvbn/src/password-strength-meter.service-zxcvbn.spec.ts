import { TestBed, fakeAsync, inject } from '@angular/core/testing';

import { PasswordStrengthMeterZXCVBNService } from './password-strength-meter-zxcvbn.service';
import { zxcvbnOptions } from '@zxcvbn-ts/core';
import { OptionsType } from '@zxcvbn-ts/core/dist/types';
import { ZXCVBN_CONFIG } from './password-strength-meter.types';

describe('PasswordStrengthMeterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordStrengthMeterZXCVBNService],
    });
  });

  it('should be created', inject(
    [PasswordStrengthMeterZXCVBNService],
    (service: PasswordStrengthMeterZXCVBNService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be created with custom config', inject(
    [PasswordStrengthMeterZXCVBNService],
    (service: PasswordStrengthMeterZXCVBNService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should return a number as score', inject(
    [PasswordStrengthMeterZXCVBNService],
    (service: PasswordStrengthMeterZXCVBNService) => {
      expect(service.score('aarasddasdsad')).toEqual(jasmine.any(Number));
    }
  ));

  it('should return a score and feedback', inject(
    [PasswordStrengthMeterZXCVBNService],
    (service: PasswordStrengthMeterZXCVBNService) => {
      const result = service.scoreWithFeedback('aarasddasdsad');
      expect(result).toEqual(jasmine.any(Object));
      expect(Object.keys(result)).toContain('score');
      expect(Object.keys(result)).toContain('feedback');
    }
  ));

  it('should return a number as score when called with async', inject(
    [PasswordStrengthMeterZXCVBNService],
    fakeAsync((service: PasswordStrengthMeterZXCVBNService) => {
      expectAsync(service.scoreAsync('aarasddasdsad')).toBeResolvedTo(
        jasmine.any(Number)
      );
    })
  ));

  it('should return a score and feedback when called with async', inject(
    [PasswordStrengthMeterZXCVBNService],
    fakeAsync((service: PasswordStrengthMeterZXCVBNService) => {
      expectAsync(
        service.scoreWithFeedbackAsync('aarasddasdsad')
      ).toBeResolvedTo(jasmine.any(Object));
    })
  ));
});

describe('PasswordStrengthMeterService - Custom Config', () => {
  const customPSMOption = {};
  let zxcvbnOptionsSpyObject: jasmine.Spy<(options?: OptionsType) => void>;

  beforeEach(() => {
    zxcvbnOptionsSpyObject = spyOn(zxcvbnOptions, 'setOptions');
    TestBed.configureTestingModule({
      providers: [
        PasswordStrengthMeterZXCVBNService,
        { provide: ZXCVBN_CONFIG, useValue: customPSMOption },
      ],
    });
  });

  it('should be created with custom object', inject(
    [PasswordStrengthMeterZXCVBNService],
    (service: PasswordStrengthMeterZXCVBNService) => {
      expect(service).toBeTruthy();
      expect(zxcvbnOptionsSpyObject).toHaveBeenCalledWith(customPSMOption);
    }
  ));
});
