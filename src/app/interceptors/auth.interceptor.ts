import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
    //empty
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.getToken(request);
    return next.handle(request);
  }

  private getToken(request: HttpRequest<unknown>) {
    if (localStorage.getItem('token')) {
      return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      });
    } else {
      return request;
    }
  }
}
