import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PasswordStrengthMeterService } from './password-strength-meter.service';

@Component({
  selector: 'password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.scss'],
  providers: [PasswordStrengthMeterService]
})
export class PasswordStrengthMeterComponent implements OnInit, OnChanges {
  @Input() password: string;

  @Input() passwordLength = 8;

  @Input() enableFeedback = false;

  passwordStrength = 0;

  feedback: { suggestions: Array<string>; warning: string } = null;

  constructor(private passwordStrengthMeterService: PasswordStrengthMeterService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['password']) {
      this.calculatePasswordStrength();
    }
  }

  private calculatePasswordStrength() {
    // TODO validation logic optimization
    if (!this.password) {
      this.passwordStrength = null;
      return;
    } else if (this.password && this.password.length < this.passwordLength) {
      this.passwordStrength = 0;
      return;
    }

    if (this.enableFeedback) {
      const result = this.passwordStrengthMeterService.scoreWithFeedback(this.password);
      this.passwordStrength = result.score;
      this.feedback = result.feedback;
    } else {
      this.passwordStrength = this.passwordStrengthMeterService.score(this.password);
      this.feedback = null;
    }
  }
}
