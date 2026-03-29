import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuth = auth.isAuthenticated();
  const path = route.routeConfig?.path;

  if (path === 'login') {
    return isAuth ? router.createUrlTree(['/home']) : true;
  }

  return isAuth ? true : router.createUrlTree(['/login']);
};