import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';

import { PasswordStrengthMeterService } from './password-strength-meter.service';

@Component({
  selector: 'password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.scss'],
})
export class PasswordStrengthMeterComponent implements OnInit, OnChanges {
  @Input() password: string;

  @Input() minPasswordLength = 8;

  @Input() enableFeedback = false;

  @Input() colors: string[] = [];

  @Input() meterNumber: number = 5;

  @Output() strengthChange = new EventEmitter<number>();

  passwordStrength: number = null;

  feedback: { suggestions: string[]; warning: string } = null;

  meterCollection: number[] = Array(this.meterNumber).fill(1);

  private prevPasswordStrength = null;

  private defaultColours = [
    'darkred',
    'orangered',
    'orange',
    'yellowgreen',
    'green'
  ];

  constructor(
    private passwordStrengthMeterService: PasswordStrengthMeterService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.password) {
      this.calculatePasswordStrength();
    }

    if (changes.meterNumber) {
      this.meterCollection = Array(this.meterNumber).fill(1);
    }
  }

  private calculatePasswordStrength() {
    // TODO validation logic optimization
    if (!this.password) {
      this.passwordStrength = null;
      this.feedback = null;
    } else if (this.password && this.password.length < this.minPasswordLength) {
      this.passwordStrength = 0;
      this.feedback = null;
    } else {
      if (this.enableFeedback) {
        const result = this.passwordStrengthMeterService.scoreWithFeedback(
          this.password
        );
        this.passwordStrength = result.score;
        this.feedback = result.feedback;
      } else {
        this.passwordStrength = this.passwordStrengthMeterService.score(
          this.password
        );
        this.feedback = null;
      }
    }

    // Only emit the passwordStrength if it changed
    if (this.prevPasswordStrength !== this.passwordStrength) {
      this.strengthChange.emit(this.passwordStrength);
      this.prevPasswordStrength = this.passwordStrength;
    }
  }

  getMeterFillColor(strength: number) {
    if (!strength || strength < 0 || strength > 5) {
      return this.colors[0] ? this.colors[0] : this.defaultColours[0];
    }

    return this.colors[strength]
      ? this.colors[strength]
      : this.defaultColours[strength];
  }

  getMeterWidth(): string {
    const width = (100 / this.meterNumber);
    return `${width}%`
  }

  getFillMeterWidth(strength: number): string {
    const strengthInPercentage = strength !== null ? ((strength + 1) / 5) * 100 : 0;
    return `${strengthInPercentage}%`
  }
}
