import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userForm: UntypedFormGroup;

  get fullName() {
    return this.userForm.get('fullName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  constructor(private fb: UntypedFormBuilder) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', Validators.required],
    });
  }

  onPasswordStrengthChanged(strength) {
    console.log('====================================');
    console.log('onPasswordStrengthChanged', strength);
    console.log('====================================');
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('====================================');
      console.log('userForm', this.userForm);
      console.log('====================================');
    } else {
      console.log('====================================');
      console.log('Invalid Form');
      console.log('====================================');
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.get(key).markAsDirty();
      });
    }
  }
}
