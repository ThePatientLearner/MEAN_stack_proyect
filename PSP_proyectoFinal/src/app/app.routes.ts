import { Routes } from '@angular/router';
import {VerSeriesComponent} from './components/ver-series/ver-series.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'verSeries',
    pathMatch: 'full'
  },
  {
    path: 'verSeries',
    component: VerSeriesComponent
  },
];
