import { Routes } from '@angular/router';
import { ReflectionComponent } from './pages/reflection/reflection.component';
import { ConsignaComponent } from './shared/components/consigna/consigna.component';
import { reflectionGuard } from './guards/reflection.guard';

export const routes: Routes = [
  {
    path: 'reflection',
    component: ReflectionComponent,
    canActivate: [reflectionGuard]
  },
  {
    path: 'consigna',
    component: ConsignaComponent
  },
  {
    path: '',
    redirectTo: '/consigna',
    pathMatch: 'full'
  }
];
