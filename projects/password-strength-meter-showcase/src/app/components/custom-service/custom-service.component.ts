import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IPasswordStrengthMeterService,
  PasswordStrengthMeterComponent,
} from 'angular-password-strength-meter';
import { CustomPsmServiceService } from '../../services/custom-psm-service/custom-psm-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-service',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordStrengthMeterComponent],
  providers: [
    {
      provide: IPasswordStrengthMeterService,
      useClass: CustomPsmServiceService,
    },
  ],
  templateUrl: './custom-service.component.html',
  styleUrl: './custom-service.component.scss',
})
export class CustomServiceComponent {
  text: string = '';
  score: number | null = null;

  public onPasswordStrengthChange(score: number | null) {
    this.score = score;
  }
}
