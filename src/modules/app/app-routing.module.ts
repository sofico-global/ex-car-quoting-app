import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { CarsContainer } from './containers/cars/cars.container';
import { ConfiguratorContainer } from './containers/configurator/configurator.container';
import { OptionsContainer } from './containers/options/options.container';
import { SummaryContainer } from './containers/summary/summary.container';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/configurator/cars',
    pathMatch: 'full'
  },
  {
    path: 'configurator',
    component: ConfiguratorContainer,
    children: [
      {
        path: '',
        redirectTo: 'cars',
        pathMatch: 'full',
      },
      {
        path: 'cars',
        component: CarsContainer
      }
    ]
  },
  {
    path: 'configurator/:carId',
    component: ConfiguratorContainer,
    children: [
      {
        path: '',
        redirectTo: 'cars',
        pathMatch: 'full',
      },
      {
        path: 'cars',
        component: CarsContainer
      },
      {
        path: 'options',
        component: OptionsContainer
      },
      {
        path: 'summary',
        component: SummaryContainer
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
