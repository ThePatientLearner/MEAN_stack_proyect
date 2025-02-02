import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'categorias',
    loadComponent: () => import('./pages/categorias/categorias.page').then( m => m.CategoriasPage)
  },
  {
    path: 'buscador',
    loadComponent: () => import('./pages/buscador/buscador.page').then( m => m.BuscadorPage)
  },
  {
    path: 'ver-series',
    loadComponent: () => import('./pages/ver-series/ver-series.page').then( m => m.VerSeriesPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'header',
    loadComponent: () => import('./pages/header/header.page').then( m => m.HeaderPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'detalles',
    loadComponent: () => import('./pages/detalles/detalles.page').then( m => m.DetallesPage)
  }
];
