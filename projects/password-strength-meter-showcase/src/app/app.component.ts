import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userForm: FormGroup;
  get fullname() {
    return this.userForm.get('fullname');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
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
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key).markAsDirty();
      });
    }
  }
}
