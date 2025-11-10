import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { CounterService } from '../services/counter.service';

export const reflectionGuard: CanActivateFn = (route, state) => {
  const counterService = inject(CounterService);
  
  if (counterService.canAccessReflection()) {
    counterService.incrementReflectionCounter();
    return true;
  } else {
    alert('Acceso bloqueado: superaste el límite de 20 visitas a la página de reflexión.');
    return false;
  }
};