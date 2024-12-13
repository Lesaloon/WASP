import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	// if the request is going for login, no need to attach token
	if (req.url.includes('/api/auth/login')) {
	  return next.handle(req);
	}

	// also we only want to attach token if the request is going to our own API
	// WARNING: THIS WILL NEED TO CHANGE ONCE I HAVE THE ENV CONFIG SETUP
	if (!req.url.includes('/api')) {
	  return next.handle(req);
	}
    const authToken = this.authService.getToken();

    if (authToken) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}