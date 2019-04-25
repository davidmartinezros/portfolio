import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-firebase-auth',
  templateUrl: './firebase-auth.component.html',
})

export class FirebaseAuthComponent {
  authForm: FormGroup;
  email: string;
  password: string;
  formData: any;

  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.authForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'validate': ''
    });
  }

  signup(formData) {
    this.authService.emailSignUp(formData.email, formData.password);
    this.email = this.password = '';
    this.authForm.reset();
  }

  login(formData) {
    this.authService.emailLogin(formData.email, formData.password);
    this.email = this.password = '';
    this.authForm.reset();
  }

  authenticated() {
    return this.authService.authenticated;
  }

  get currentEmail() {
    return this.authService.currentEmail;
  }

  logout() {
    this.authService.signOut();
  }
}
