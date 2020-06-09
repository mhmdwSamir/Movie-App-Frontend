import { AsyncValidator, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/authentication';

@Injectable({ providedIn: 'root' })
export class UniqueEmail implements AsyncValidator {
  rootUrl = 'http://localhost:3000/api/user/find-user'
  validate = (control: AbstractControl) => {
    // if UserName is Unique return Null
    const email = control.value;

    return this._http.get<User[]>(this.rootUrl, { params: { email }})
    .pipe(
      map((user) => {
        if (user) {
          return { existingEmail: true };
        } else {
          return null;
        }
      }),
      catchError((err) => {
        return of({ connectionError: true });
      })
    );
  };

  constructor(private _http: HttpClient) {}
}

/*
 Property 'validate' in type 'UniqueUserName' is not assignable
  to the same property in base type 'AsyncValidator'.
  Type '() => void' is not assignable to type 
  '(control: AbstractControl) => Promise<ValidationErrors> | Observable<ValidationErrors>'.
    Type 'void' is not assignable to type 'Promise<ValidationErrors> | Observable<ValidationErrors>
*/
