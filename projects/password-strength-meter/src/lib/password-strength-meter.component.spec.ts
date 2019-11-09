import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PasswordStrengthMeterComponent } from './password-strength-meter.component';
import { PasswordStrengthMeterService } from './password-strength-meter.service';

/* tslint:disable:no-string-literal */
describe('PasswordStrengthMeterComponent', () => {
  let component: PasswordStrengthMeterComponent;
  let fixture: ComponentFixture<PasswordStrengthMeterComponent>;
  let passwordStrengthMeterService: PasswordStrengthMeterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordStrengthMeterComponent],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthMeterComponent);
    component = fixture.componentInstance;
    passwordStrengthMeterService = fixture.debugElement.injector.get(PasswordStrengthMeterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call calculatePasswordStrength on password change', () => {
    spyOn<any>(component, 'calculatePasswordStrength');
    component.password = '123456';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true)
    });
    fixture.detectChanges();
    expect(component['calculatePasswordStrength']).toHaveBeenCalled();
  });

  it('should change the password strength as null on empty password', () => {
    component.password = '';
    component['calculatePasswordStrength']();
    fixture.detectChanges();
    expect(component.passwordStrength).toBeNull();
  });

  it('should change the password strength as 0 on fail to meet the min password length', () => {
    component.password = '123';
    component['calculatePasswordStrength']();
    fixture.detectChanges();
    expect(component.passwordStrength).toBe(0);
  });

  it('should update the password strength meter', () => {
    spyOn(passwordStrengthMeterService, 'score').and.returnValue(2);
    spyOn(component.strengthChange, 'emit');

    component.password = '123asd123';
    component['calculatePasswordStrength']();
    fixture.detectChanges();
    const passwordMeter = fixture.debugElement.query(By.css('.strength-meter-fill'));

    expect(passwordMeter.attributes['data-strength']).toBe('2');
    expect(component.passwordStrength).toBe(2);
    expect(component.strengthChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit password strength on no strength chanage', () => {
    spyOn(passwordStrengthMeterService, 'score').and.returnValue(2);
    spyOn(component.strengthChange, 'emit');

    component.password = '123asd123';
    component['calculatePasswordStrength']();

    expect(component.passwordStrength).toBe(2);

    component.password = '123asd12';
    component['calculatePasswordStrength']();
    expect(component.passwordStrength).toBe(2);

    expect(component.strengthChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should display feedback on enableFeedback', () => {
    spyOn(passwordStrengthMeterService, 'score').and.returnValue(2);
    spyOn(passwordStrengthMeterService, 'scoreWithFeedback').and.returnValue({
      score: 2,
      feedback: {
        suggestions: ['Add another word or two', 'Uncommon words are better.'],
        warning: 'This is a very common password'
      }
    });

    component.password = '123asd123';
    component.enableFeedback = false;
    component['calculatePasswordStrength']();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.password-feedback'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.password-suggetion'))).toBeNull();
    expect(passwordStrengthMeterService.scoreWithFeedback).toHaveBeenCalledTimes(0);

    component.enableFeedback = true;
    component['calculatePasswordStrength']();
    fixture.detectChanges();

    expect(passwordStrengthMeterService.scoreWithFeedback).toHaveBeenCalledTimes(1);
    expect(fixture.debugElement.query(By.css('.password-feedback'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.password-suggetion'))).toBeTruthy();
  });

  it('should use the custom colors', () => {
    component.colors = ['darkred', 'orangered', 'purple', 'yellowgreen', 'green'];
    expect(component.getMeterFillColor(2)).toEqual('purple');
  });
});
