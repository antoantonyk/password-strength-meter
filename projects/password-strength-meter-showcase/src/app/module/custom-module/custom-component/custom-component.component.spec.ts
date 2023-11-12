import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomComponentComponent } from './custom-component.component';
import { PasswordStrengthMeterComponent } from 'angular-password-strength-meter';
import { FormsModule } from '@angular/forms';
import { provideZxvbnServiceForPSM } from 'angular-password-strength-meter/zxcvbn';

describe('CustomComponentComponent', () => {
  let component: CustomComponentComponent;
  let fixture: ComponentFixture<CustomComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordStrengthMeterComponent, FormsModule],
      declarations: [CustomComponentComponent],
      providers: [provideZxvbnServiceForPSM()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
