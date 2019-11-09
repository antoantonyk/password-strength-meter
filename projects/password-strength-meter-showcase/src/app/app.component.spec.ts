import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

/* tslint:disable:no-string-literal */
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PasswordStrengthMeterModule],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('User Form', () => {
    it('form invalid when empty', () => {
      expect(component.userForm.valid).toBeFalsy();
    });

    it('fullname field validity', () => {
      let errors = {};
      const fullName = component.userForm.controls['fullname'];
      expect(fullName.valid).toBeFalsy();

      // fullName field is required
      errors = fullName.errors || {};
      expect(errors['required']).toBeTruthy();

      // Set fullName to something
      fullName.setValue('Anto Antony');
      errors = fullName.errors || {};
      expect(errors['required']).toBeFalsy();
    });

    it('email field validity', () => {
      let errors = {};
      const email = component.userForm.controls['email'];
      expect(email.valid).toBeFalsy();

      // Email field is required
      errors = email.errors || {};
      expect(errors['required']).toBeTruthy();

      // Set email to something
      email.setValue('test');
      errors = email.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();

      // Set email to something correct
      email.setValue('test@example.com');
      errors = email.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();
    });

    it('password field validity', () => {
      spyOn(component, 'onPasswordStrengthChanged');
      fixture.detectChanges();
      let errors = {};
      const password = component.userForm.controls['password'];
      const passwordStrengthMeter = fixture.debugElement.query(By.css('.strength-meter-fill'));

      // Email field is required
      errors = password.errors || {};
      expect(errors['required']).toBeTruthy();
      expect(passwordStrengthMeter.properties['data-strength']).toBeUndefined();

      password.setValue('simple');
      fixture.detectChanges();
      errors = password.errors || {};
      expect(passwordStrengthMeter.attributes['data-strength']).toEqual('0');
      expect(errors['required']).toBeFalsy();
      expect(component.onPasswordStrengthChanged).toHaveBeenCalled();

      password.setValue('hardToFigureOut123');
      fixture.detectChanges();
      errors = password.errors || {};
      expect(passwordStrengthMeter.attributes['data-strength']).toEqual('4');
      expect(errors['required']).toBeFalsy();
      expect(component.onPasswordStrengthChanged).toHaveBeenCalled();
    });

    it('should able to submitthe form', () => {
      spyOn(component, 'onSubmit');
      expect(component.userForm.valid).toBeFalsy();

      component.userForm.controls['fullname'].setValue('Anto Antony');
      component.userForm.controls['email'].setValue('test@test.com');
      component.userForm.controls['password'].setValue('123456789');
      fixture.detectChanges();

      component.onSubmit();

      expect(component.userForm.valid).toBeTruthy();
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should show errors on submitting an invalid form', () => {
      spyOn(component, 'onSubmit');
      expect(component.userForm.valid).toBeFalsy();

      component.userForm.controls['fullname'].setValue('');
      component.userForm.controls['email'].setValue('test@test.com.');
      component.userForm.controls['password'].setValue('123456789');
      fixture.detectChanges();

      component.onSubmit();

      expect(component.userForm.valid).toBeFalsy();
      expect(component.onSubmit).toHaveBeenCalled();
    });
  });
});
