import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if( this.authService.isLoggedIn() ) {
      return true
    }
    // redirect to login
    this.router.navigate(['/login']);
    return false;
    
  }
}