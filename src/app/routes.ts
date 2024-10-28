import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KasboekenComponent } from './kasboeken/kasboeken.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'kasboeken',
    component: KasboekenComponent,
    title: 'Kasboeken'
  }
];

export default routeConfig;
