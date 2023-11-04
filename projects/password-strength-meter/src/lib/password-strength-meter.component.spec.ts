import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PasswordStrengthMeterComponent } from './password-strength-meter.component';
import { IPasswordStrengthMeterService } from './password-strength-meter-service';
import { PSMProgressBarDirective } from './psm-progress-bar.directive';

describe(PasswordStrengthMeterComponent.name, () => {
  let component: PasswordStrengthMeterComponent;
  let fixture: ComponentFixture<PasswordStrengthMeterComponent>;
  let passwordStrengthMeterService: jasmine.SpyObj<IPasswordStrengthMeterService>;

  beforeEach(waitForAsync(() => {
    passwordStrengthMeterService =
      jasmine.createSpyObj<IPasswordStrengthMeterService>(
        IPasswordStrengthMeterService.name,
        ['score', 'scoreWithFeedback', 'scoreAsync', 'scoreWithFeedbackAsync']
      );

    TestBed.configureTestingModule({
      declarations: [PasswordStrengthMeterComponent, PSMProgressBarDirective],
      providers: [
        {
          provide: IPasswordStrengthMeterService,
          useValue: passwordStrengthMeterService,
        },
      ],
    }).compileComponents();

    passwordStrengthMeterService.score.and.stub();
    passwordStrengthMeterService.scoreWithFeedback.and.stub();

    fixture = TestBed.createComponent(PasswordStrengthMeterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the password strength as 0 on when failed to meet the min password length', fakeAsync(() => {
    component.password = '123456';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    tick(100);

    expect(passwordStrengthMeterService.score).not.toHaveBeenCalled();
    expect(component.passwordStrength).toBe(0);
    expect(component.feedback).toBeNull();
  }));

  it('should change the password strength as null on empty password', fakeAsync(() => {
    passwordStrengthMeterService.score.and.returnValue(3);

    component.password = '123456789';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });

    fixture.detectChanges();
    tick(100);

    expect(passwordStrengthMeterService.score).toHaveBeenCalledOnceWith(
      component.password
    );

    component.password = '';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    tick(100);

    expect(component.passwordStrength).toBeNull();
    expect(component.feedback).toBeNull();
  }));

  it('should update the password strength meter', fakeAsync(() => {
    const passwordStrength = 3;
    passwordStrengthMeterService.score.and.returnValue(passwordStrength);
    spyOn(component.strengthChange, 'emit');

    component.password = '123asd123';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    tick(100);

    // detect UI changes
    fixture.detectChanges();
    const passwordMeter = fixture.debugElement.query(
      By.css('.psm__progress-bar')
    );

    expect(passwordMeter.attributes['data-strength']).toBe(
      `${passwordStrength}`
    );
    expect(component.passwordStrength).toBe(passwordStrength);
    expect(component.strengthChange.emit).toHaveBeenCalledWith(
      passwordStrength
    );
  }));

  it('should not emit password strength on when no strength change', fakeAsync(() => {
    const passwordStrength = 3;
    passwordStrengthMeterService.score.and.returnValue(passwordStrength);
    spyOn(component.strengthChange, 'emit');

    component.password = '123asd123';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    tick(100);

    expect(component.passwordStrength).toBe(passwordStrength);

    component.password = '123asd1231';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    tick(100);

    expect(component.passwordStrength).toBe(passwordStrength);
    expect(component.strengthChange.emit).toHaveBeenCalledTimes(1);
  }));

  it('should display feedback on enableFeedback', fakeAsync(() => {
    const passwordStrength = 3;
    passwordStrengthMeterService.score.and.returnValue(passwordStrength);
    passwordStrengthMeterService.scoreWithFeedback.and.returnValue({
      score: passwordStrength,
      feedback: {
        suggestions: ['Add another word or two', 'Uncommon words are better.'],
        warning: 'This is a very common password',
      },
    });

    component.password = '123asd123';
    component.enableFeedback = false;
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    tick(100);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.psm__feedback'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.psm__suggestion'))).toBeNull();
    expect(
      passwordStrengthMeterService.scoreWithFeedback
    ).toHaveBeenCalledTimes(0);

    component.enableFeedback = true;
    component.password = '123asd1253';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    tick(100);
    fixture.detectChanges();

    expect(
      passwordStrengthMeterService.scoreWithFeedback
    ).toHaveBeenCalledTimes(1);
    expect(fixture.debugElement.query(By.css('.psm__feedback'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.psm__suggestion'))).toBeTruthy();
  }));

  it('should call score async function when async option enabled', fakeAsync(() => {
    const passwordStrength = 3;
    passwordStrengthMeterService.scoreAsync.and.resolveTo(passwordStrength);
    spyOn(component.strengthChange, 'emit');

    component.enableAsync = true;
    component.password = '123asd123';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    tick(100);

    // detect UI changes
    fixture.detectChanges();

    expect(passwordStrengthMeterService.scoreAsync).toHaveBeenCalledWith(
      component.password
    );
    expect(component.passwordStrength).toBe(passwordStrength);
    expect(component.strengthChange.emit).toHaveBeenCalledWith(
      passwordStrength
    );
  }));

  it('should call scoreWithFeedback async function when async option enabled', fakeAsync(() => {
    const passwordStrength = 3;
    passwordStrengthMeterService.scoreWithFeedbackAsync.and.resolveTo({
      score: passwordStrength,
      feedback: {
        suggestions: ['Add another word or two', 'Uncommon words are better.'],
        warning: 'This is a very common password',
      },
    });
    spyOn(component.strengthChange, 'emit');

    component.enableAsync = true;
    component.enableFeedback = true;
    component.password = '123asd123';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    tick(100);

    // detect UI changes
    fixture.detectChanges();

    expect(
      passwordStrengthMeterService.scoreWithFeedbackAsync
    ).toHaveBeenCalledWith(component.password);
    expect(component.passwordStrength).toBe(passwordStrength);
    expect(component.strengthChange.emit).toHaveBeenCalledWith(
      passwordStrength
    );
  }));
});
