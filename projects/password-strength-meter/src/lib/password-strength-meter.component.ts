import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  HostBinding,
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

  @Input() numberOfProgressBarItems = 5;

  @Output() strengthChange = new EventEmitter<number>();

  @HostBinding('class') baseClass = 'psm';

  passwordStrength: number = null;

  feedback: { suggestions: string[]; warning: string } = null;

  private prevPasswordStrength = null;

  constructor(
    private passwordStrengthMeterService: PasswordStrengthMeterService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.password) {
      this.calculatePasswordStrength();
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
}
