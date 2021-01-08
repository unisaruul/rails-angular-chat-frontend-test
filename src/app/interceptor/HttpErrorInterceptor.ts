import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token'),
        },
      });
    }

    return next.handle(request).pipe(tap(res => {
      if (res instanceof HttpResponse && res.headers.get('Authorization')) {
        localStorage.setItem('token', res.headers.get('Authorization'));
      }
    }), catchError(err => {
      const error = err.error || err.statusText;
      return throwError(error);
    }));
  }
}
