import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const loginGuard: CanMatchFn = (route, segments) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  //return authService.isLogged;
  return authService.validateToken()
  .pipe(
    tap( valid => {
      if (!valid) {
        router.navigateByUrl('/login');
      
      }
    })
  )
};

// export const loginGuard: CanMatchFn = (route, segments) => {
//   const authService: AuthService = inject(AuthService);
//   return authService.isLogged;
// };

//crear una que redirija a la pagina de login
export const loginRedirectGuard: CanMatchFn = (route, segments) => {
  const authService: AuthService = inject(AuthService);
  //return authService.isLogged;
  return true;
}
