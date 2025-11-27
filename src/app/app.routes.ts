import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'reserva',
    loadComponent: () => import('./reserva/reserva.page').then( m => m.ReservaPage)
  },
  {
    path: 'reserva-lista',
    loadComponent: () => import('./reserva-lista/reserva-lista.page').then( m => m.ReservaListaPage)
  },
];
