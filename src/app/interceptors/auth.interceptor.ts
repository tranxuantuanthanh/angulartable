import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private _loading: LoadingService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let index = req.url.indexOf('users');
    this._loading.setLoading(true, req.url);
    if (index != -1) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.authService.token}`,
        },
      });
    }

    return next.handle(req).pipe(catchError((err) => {
      this._loading.setLoading(false, req.url);
      return err;
    }))
      .pipe(map<unknown, any>((evt: unknown) => {
        if (evt instanceof HttpResponse) {
          this._loading.setLoading(false, req.url);
        }
        return evt;
      }));;
  }
}