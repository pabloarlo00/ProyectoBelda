import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
  {
    path: 'principal',
    loadComponent: () =>
      import('./pages/principal/principal.page').then((m) => m.PrincipalPage),
  },
  {
    path: 'buscar',
    loadComponent: () => import('./pages/buscar/buscar.page').then( m => m.BuscarPage)
  },
];
