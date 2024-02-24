import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { of, tap } from 'rxjs';

export const AuthMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  // console.log({route}, {segments});

  return inject(AuthService)
    .checkAuthenticated()
    .pipe(tap((isAuth) => console.log(`Authenticated: ${isAuth}`)));
};

export const AuthActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService
    .checkAuthenticated()
    .pipe(
      tap(isAuth => console.log(`Authenticated: ${isAuth}`)),
      tap(isAuth => {
        if (!isAuth) {
          router.navigate(['/auth/login']);
        }
      })
    );
};
