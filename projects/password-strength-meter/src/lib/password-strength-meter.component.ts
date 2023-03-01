import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';

import { IPasswordStrengthMeterService } from './password-strength-meter.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.scss']
})
export class PasswordStrengthMeterComponent implements OnChanges {
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
    private passwordStrengthMeterService: IPasswordStrengthMeterService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.password) {
      // TODO validation logic optimization
      if (!this.password) {
        this.passwordStrength = null;
        this.feedback = null;
        this.emitChanges();
      } else if (this.password && this.password.length < this.minPasswordLength) {
        this.passwordStrength = 0;
        this.feedback = null;
        this.emitChanges();
      } else {
        this.calculatePasswordStrength();
      }
    }
  }

  private calculatePasswordStrength(): void {
    if (this.enableFeedback) {
      Promise.resolve( this.passwordStrengthMeterService.scoreWithFeedback(this.password))
        .then(result => {
          this.passwordStrength = result.score;
          this.feedback = result.feedback;
          this.emitChanges();
        }
      )
    } else {
      this.passwordStrength = this.passwordStrengthMeterService.score(
        this.password
      );
      this.feedback = null;
      this.emitChanges();
    }
  }

  private emitChanges(): void{
    if (this.prevPasswordStrength !== this.passwordStrength) {
      this.strengthChange.emit(this.passwordStrength);
      this.prevPasswordStrength = this.passwordStrength;
    }
  }
}
