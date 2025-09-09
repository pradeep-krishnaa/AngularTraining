import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const role = auth.getUserRole();
    
    if (role === expectedRole) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  };
};