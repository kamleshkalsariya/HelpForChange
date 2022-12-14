import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){}
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth = this.authService.isLoggedIn()
    if(!isAuth) {
      this.router.navigate(['/signIn'])
    }
    return isAuth;
  }
  
}
