import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  expiresIn: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private roleSubject = new BehaviorSubject<string | null>(null);
  private expirationSubject = new BehaviorSubject<Date | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>('/api/auth/login', {
      username,
      password,
    }).pipe(
      map((response: LoginResponse) => {
        if (response.token) {
          this.setToken(response);
        }
        return response;
      })
    );
  }

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  setToken(tokenResponse: LoginResponse) {
    const { token, expiresIn, role } = tokenResponse;
    const expirationTime = new Date(Date.now() + expiresIn * 1000);

    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
    localStorage.setItem('expiresTime', expirationTime.toString());

    this.tokenSubject.next(token);
    this.roleSubject.next(role);
    this.expirationSubject.next(expirationTime);
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

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getRole();
    return userRole ? roles.includes(userRole) : false;
  }

  loadToken(): void {
    // Load token from localStorage if it exists
    const token = this.getToken();
    const role = this.getRole();
    const expiration = this.getExpiration();
    
    if (token && role && expiration) {
      this.tokenSubject.next(token);
      this.roleSubject.next(role);
      this.expirationSubject.next(expiration);
    }
  }
}
