import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsContainer } from './containers/cars/cars.container';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/cars',
    pathMatch: 'full'
  },
  {
    path: 'cars',
    component: CarsContainer
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
