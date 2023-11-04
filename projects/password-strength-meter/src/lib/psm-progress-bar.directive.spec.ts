/* eslint-disable @typescript-eslint/no-unused-vars */

import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PasswordStrengthMeterComponent } from './password-strength-meter.component';
import {
  FeedbackResult,
  IPasswordStrengthMeterService,
} from './password-strength-meter-service';
import { PSMProgressBarDirective } from './psm-progress-bar.directive';

class PasswordStrengthMeterService extends IPasswordStrengthMeterService {
  score(password: string): number {
    return 1;
  }

  scoreWithFeedback(password: string): {
    score: number;
    feedback: { warning: string; suggestions: string[] };
  } {
    return {
      score: 1,
      feedback: {
        warning: 'warning text',
        suggestions: ['try entering a better password.'],
      },
    };
  }

  scoreAsync(password: string): Promise<number> {
    return Promise.resolve(this.score(password));
  }

  scoreWithFeedbackAsync(password: string): Promise<FeedbackResult> {
    return Promise.resolve(this.scoreWithFeedback(password));
  }
}

describe('Directive: PasswordStrengthMeter - ProgressBar', () => {
  let component: PasswordStrengthMeterComponent;
  let fixture: ComponentFixture<PasswordStrengthMeterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PSMProgressBarDirective, PasswordStrengthMeterComponent],
      providers: [
        {
          provide: IPasswordStrengthMeterService,
          useClass: PasswordStrengthMeterService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordStrengthMeterComponent);
    component = fixture.componentInstance;
  }));

  it('should create progress bar items with default value', () => {
    fixture.detectChanges();
    expect(component.numberOfProgressBarItems).toBe(5);
    const items = fixture.debugElement.queryAll(
      By.css('.psm__progress-bar-item')
    );

    expect(items.length).toEqual(5);
    expect(items[0].styles.width).toEqual(`${100 / 5}%`);
  });

  it('should create progress bar items with provided value', () => {
    component.numberOfProgressBarItems = 3;
    fixture.detectChanges();

    expect(component.numberOfProgressBarItems).toBe(3);

    const items = fixture.debugElement.queryAll(
      By.css('.psm__progress-bar-item')
    );

    expect(items.length).toEqual(3);
    expect(items[0].styles.width).toEqual(`33.3333%`);
  });

  it('should update the aria attributes', () => {
    component.passwordStrength = 3;
    fixture.detectChanges();

    expect(component.numberOfProgressBarItems).toBe(5);

    const progressBarElement = fixture.debugElement.query(
      By.css('.psm__progress-bar')
    ).nativeElement as HTMLDivElement;

    expect(progressBarElement.getAttribute('aria-valuenow')).toEqual('80');
    expect(progressBarElement.getAttribute('data-strength')).toEqual('3');

    const progressBarOverlay = fixture.debugElement.query(
      By.css('.psm__progress-bar-overlay')
    ).nativeElement as HTMLDivElement;

    expect(progressBarOverlay.style.width).toEqual('80%');
    expect(progressBarOverlay.style.backgroundColor).toEqual('yellowgreen');
  });
});
