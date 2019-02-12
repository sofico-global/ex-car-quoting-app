import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppContainer } from './containers/app/app.container';
import { CarsContainer } from './containers/cars/cars.container';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarListItemComponent } from './components/car-list/car-list-item.component';
import { ConfiguratorContainer } from './containers/configurator/configurator.container';
import { OptionsContainer } from './containers/options/options.container';
import { SummaryContainer } from './containers/summary/summary.container';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlMultiCheckboxComponent } from './components/form-control-multi-checkbox/form-control-multi-checkbox.component';
import { CarService } from './services/car.service';
import { FilterService } from './services/filter.service';
import { ActiveSelectionComponent } from './components/active-selection/active-selection.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FiltersComponent } from './components/filters/filters.component';
import { OptionService } from './services/option.service';
import { OptionsListComponent } from './components/options-list/options-list.component';
import { rootReducer } from '../statemanagement/root.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppContainer,
    ConfiguratorContainer,
    CarsContainer,
    OptionsContainer,
    SummaryContainer,
    CarListComponent,
    CarListItemComponent,
    FormControlMultiCheckboxComponent,
    ActiveSelectionComponent,
    SideBarComponent,
    FiltersComponent,
    OptionsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [CarService, FilterService, OptionService],
  bootstrap: [AppContainer]
})
export class AppModule {
}
