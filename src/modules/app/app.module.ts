import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppContainer } from './containers/app/app.container';
import { CarsContainer } from './containers/cars/cars.container';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarListItemComponent } from './components/car-list/car-list-item.component';

@NgModule({
  declarations: [
    AppContainer,
    CarsContainer,
    CarListComponent,
    CarListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppContainer]
})
export class AppModule { }
