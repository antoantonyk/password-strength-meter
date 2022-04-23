/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { CustomPsmServiceService } from './custom-psm-service.service';

describe('Service: CustomPsmService', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [CustomPsmServiceService],
    });
  }));

  it('should create', inject(
    [CustomPsmServiceService],
    (service: CustomPsmServiceService) => {
      expect(service).toBeTruthy();
    }
  ));
});
