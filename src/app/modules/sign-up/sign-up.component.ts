import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../../@core/CustomValidator/match-password';
import { UniqueEmail } from '../.././@core/CustomValidator/unique-user-name';
import { from } from 'rxjs';
import { AuthenticationService } from '../../signingService/authenitcation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  genders = [
    { label: 'MALE', value: 'male' },
    { label: 'FEMALE', value: 'female' },
    { label: 'OTHER', value: 'other' },
  ];
  signUpForm = new FormGroup(
    {
      name: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
          Validators.pattern(/^[a-z]|[A-Z]/),
        ]
      ),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
      ConfirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
      gender: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required], [this._uniqueEmailValidator.validate])
    },
    { validators: [this._matchPassword.validate] }
  );

  constructor(
    private _matchPassword: MatchPassword,
    private _router: Router,
    private _signService: AuthenticationService,
    private _uniqueEmailValidator: UniqueEmail
  ) {}
  ngOnInit(): void {}
  OnSubmit() {
    console.log('fdbalbasfvdfvndfvn');
    console.log(this.signUpForm);

    if (this.signUpForm.valid) {
      const { name: username, password, email, gender } = this.signUpForm.value;

      this._signService.signUp({ email, password, username})
      .subscribe(
        (resp) => {
          const { token, user } = resp;
          localStorage.setItem('user', JSON.stringify({ user, token }));
          this._signService.setAuthenticationState(true);
          this._router.navigate([''])
        }
      )
    } else {
      this.signUpForm.markAllAsTouched();
      for (const key in this.signUpForm.controls) {
        this.signUpForm.get(key).markAsDirty();
      }
      return;
    }

    // One have User Data To Sign up
  }
  onClickReset() {
    this.signUpForm.reset();
  }
}
