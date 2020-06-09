import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/signingService/authenitcation.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(private _authService: AuthenticationService, private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._activate()
    .pipe(
      tap(
        (authoizedState) => {
          if (!authoizedState) {
            this._router.navigate(['/access-denaied'])
          }
      }
      )
    )
  }

  private _activate() {
    return this._authService.isAuthorized();
  }
  
}
