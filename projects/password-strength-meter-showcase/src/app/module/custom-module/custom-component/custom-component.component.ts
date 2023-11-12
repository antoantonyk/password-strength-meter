import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrl: './custom-component.component.scss',
})
export class CustomComponentComponent {
  text: string = '';
  score: number | null = null;

  public onPasswordStrengthChange(score: number | null) {
    this.score = score;
  }
}
