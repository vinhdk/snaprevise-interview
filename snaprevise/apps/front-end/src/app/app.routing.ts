import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },

];

export const AppRoutes = RouterModule.forRoot(routes, { useHash: true });
