import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/signingService/authenitcation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  passwordType = 'password';
  genders = [
    { label: 'Male', value: 'male' },
    { label: 'FeMale', value: 'female' },
    { label: 'Other', value: 'other' },
  ];
  form = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z]/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
  });

  loginFialdError: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => (this.loginFialdError = null));
  }
  onSignInSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      for (const key in this.form.controls) {
        this.form.get(key).markAsDirty();
      }
      return;
    }
    const { username, password } = this.form.value;
    this.authenticationService.login(username, password).subscribe(
      (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.authenticationService.currentUser = user;
        this.router.navigate(['']);
      },
      (err) => {
        this.loginFialdError = 'Invalid username or password!!';
      }
    );
  }
}
