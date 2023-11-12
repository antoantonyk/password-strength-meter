/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  HostBinding,
  inject,
  booleanAttribute,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';

import {
  Feedback,
  FeedbackResult,
  IPasswordStrengthMeterService,
} from './password-strength-meter-service';
import { PSMProgressBarDirective } from './psm-progress-bar.directive';

@Component({
  standalone: true,
  selector: 'password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.scss'],
  imports: [PSMProgressBarDirective],
})
export class PasswordStrengthMeterComponent implements OnChanges {
  @Input({ required: true }) password!: string;

  @Input() minPasswordLength = 8;

  @Input({ transform: booleanAttribute }) enableFeedback = false;

  @Input({ transform: booleanAttribute }) enableAsync = false;

  @Input() colors: string[] = [];

  @Input() numberOfProgressBarItems = 5;

  @Output() strengthChange = new EventEmitter<number | null>();

  @HostBinding('class') baseClass = 'psm';

  private passwordStrengthMeterService: IPasswordStrengthMeterService = inject(
    IPasswordStrengthMeterService
  );

  passwordStrength: number | null = null;
  feedback: Feedback | null = null;

  private prevPasswordStrength: number | null = null;
  private passwordChangeObservable$ = new Subject<string>();

  constructor() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['password']) {
      this.passwordChangeObservable$.next(this.password);
    }
  }

  private init(): void {
    this.passwordChangeObservable$
      .pipe(
        distinctUntilChanged(),
        debounceTime(100),
        switchMap((value) => {
          if (!value) {
            return of({ score: null, feedback: null });
          }

          if (value && value.length < this.minPasswordLength) {
            return of({ score: 0, feedback: null });
          }

          if (this.enableAsync) {
            return this.calculateScoreAsync(value);
          }

          const result = this.calculateScore(value);
          return of(result);
        }),
        takeUntilDestroyed()
      )
      .subscribe((result: FeedbackResult) => {
        this.passwordStrength = result.score;
        this.feedback = result.feedback;

        // Only emit the passwordStrength if it changed
        if (this.prevPasswordStrength !== this.passwordStrength) {
          this.strengthChange.emit(this.passwordStrength);
          this.prevPasswordStrength = this.passwordStrength;
        }
      });
  }

  private calculateScore(value: string): FeedbackResult {
    if (this.enableFeedback) {
      return this.passwordStrengthMeterService.scoreWithFeedback(value);
    }

    const feedbackResult = {
      score: this.passwordStrengthMeterService.score(value),
      feedback: null,
    };

    return feedbackResult;
  }

  private calculateScoreAsync(value: string): Promise<FeedbackResult> {
    if (this.enableFeedback) {
      return this.passwordStrengthMeterService.scoreWithFeedbackAsync(value);
    }

    return this.passwordStrengthMeterService
      .scoreAsync(value)
      .then((result) => ({
        score: result,
        feedback: null,
      }));
  }
}
