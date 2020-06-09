import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/signingService/authenitcation.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthenticationService) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.getToken();

    return next.handle((httpRequest.clone({ setHeaders: { Authorization: token } })));
  }
}