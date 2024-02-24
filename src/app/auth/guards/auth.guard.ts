import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const AuthMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return inject(AuthService)
    .checkAuthenticated()
    .pipe(tap((isAuth) => console.log(`Authenticated: ${isAuth}`)));
};

export const HeroesGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
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

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService
    .checkAuthenticated()
    .pipe(
      tap(isAuth => console.log(`Authenticated: ${isAuth}`)),
      tap(isAuth => {
        if (isAuth) {
          router.navigate(['/heroes/list']);
        }
      }),
      map(isAuth => !isAuth)
    );
};
