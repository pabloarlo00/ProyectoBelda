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
    loadComponent: () =>
      import('./pages/buscar/buscar.page').then((m) => m.BuscarPage),
  },
  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./pages/detalle/detalle.page').then((m) => m.DetallePage),
  },
  {
    path: 'secciones',
    loadComponent: () => import('./pages/secciones/secciones.page').then( m => m.SeccionesPage)
  },
];
