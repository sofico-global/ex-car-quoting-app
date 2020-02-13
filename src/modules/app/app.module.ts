import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppContainer} from './containers/app/app.container';
import {CarsContainer} from './containers/cars/cars.container';
import {CarListComponent} from './components/car-list/car-list.component';
import {CarListItemComponent} from './components/car-list/car-list-item.component';
import {ConfiguratorContainer} from './containers/configurator/configurator.container';
import {OptionsContainer} from './containers/options/options.container';
import {SummaryContainer} from './containers/summary/summary.container';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlMultiCheckboxComponent} from './components/form-control-multi-checkbox/form-control-multi-checkbox.component';
import {CarService} from './services/car.service';
import {FilterService} from './services/filter.service';
import {ActiveCarSelectionComponent} from './components/active-selection/active-car-selection.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {FiltersComponent} from './components/filters/filters.component';
import {OptionService} from './services/option.service';
import {OptionsListComponent} from './components/options-list/options-list.component';
import {SelectedOptionListComponent} from './components/selected-option-list/selected-option-list.component';
import {LeasePriceService} from './services/lease-price.service';
import {HttpClientModule} from '@angular/common/http';
import {LeasePriceComponent} from './components/lease-price/lease-price.component';
import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {SelectedOptionListItemComponent} from './components/selected-option-list/selected-option-list-item.component';
import {AppSandbox} from './app.sandbox';

// register locales
registerLocaleData(localeNl);

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
    ActiveCarSelectionComponent,
    SideBarComponent,
    FiltersComponent,
    OptionsListComponent,
    SelectedOptionListComponent,
    SelectedOptionListItemComponent,
    LeasePriceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AppSandbox,
    CarService,
    FilterService,
    OptionService,
    LeasePriceService,
    {provide: LOCALE_ID, useValue: 'nl-BE'},
  ],
  bootstrap: [AppContainer]
})
export class AppModule {
}
