import { Injectable } from '@angular/core';
import ITokenResponses from '../interfaces/tokenResponses.interface';
import { ApiResponse } from '../interfaces/api-responce.interface';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private roleSubject = new BehaviorSubject<string | null>(null);
  private expirationSubject = new BehaviorSubject<Date | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<ApiResponse<any>>('/api/auth/login', {
        username,
        password,
      })
      .pipe(
        map((response: ApiResponse<any>) => {
          if (response.success && response.token) {
            this.setToken(response.token);
          }
          return response;
        })
      );
  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  setToken(tokenResponse: ITokenResponses) {
    const { token, expiresTime, role } = tokenResponse;
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
    localStorage.setItem('expiresTime', expiresTime.toString());

    this.tokenSubject.next(token);
    this.roleSubject.next(role);
    this.expirationSubject.next(new Date(expiresTime));
  }

  clearToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('expiresTime');

    this.tokenSubject.next(null);
    this.roleSubject.next(null);
    this.expirationSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getExpiration(): Date | null {
    const expiresTime = localStorage.getItem('expiresTime');
    return expiresTime ? new Date(expiresTime) : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const expiration = this.getExpiration();
    return !!token && !!expiration && new Date() < expiration;
  }
}
