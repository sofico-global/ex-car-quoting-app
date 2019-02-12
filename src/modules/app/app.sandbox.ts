import { Injectable } from '@angular/core';
import { LeasePriceService } from './services/lease-price.service';
import { CarService } from './services/car.service';
import { OptionService } from './services/option.service';
import { Observable } from 'rxjs';
import { ApplicationState } from '../statemanagement/application.state';
import {
  select,
  Store
} from '@ngrx/store';
import {
  mapTo,
  tap
} from 'rxjs/operators';
import {
  AddOptionAction,
  ClearOptionsAction,
  RemoveOptionAction,
  SetLeasePriceAction
} from '../statemanagement/actions';
import { Option } from './types/option.type';
import { FilterService } from './services/filter.service';
import { Car } from './types/car.type';
import { FilterValue } from './types/filter-value.type';

@Injectable()
export class AppSandbox {
  leasePrice$: Observable<number> = this.store.pipe(select(state => state.leasePrice));
  selectedOptions$: Observable<Option[]> = this.store.pipe(select(state => state.options));

  constructor(private store: Store<ApplicationState>,
              private leasePriceService: LeasePriceService,
              private carService: CarService,
              private optionService: OptionService,
              private filterService: FilterService) {
  }

  calculate(carId: string, optionIds: string[]): Observable<boolean> {
    this.store.dispatch(new SetLeasePriceAction(null));

    return this.leasePriceService.calculate(carId, optionIds).pipe(
      tap(leasePrice => this.store.dispatch(new SetLeasePriceAction(leasePrice))),
      mapTo(true)
    );
  }

  getCars(): Observable<Car[]> {
    return this.carService.find();
  }

  getCar(carId: string): Observable<Car> {
    return this.carService.findOne(carId);
  }

  getFilterMakes(): FilterValue[] {
    return this.filterService.filterMakes;
  }

  getFilterFuelTypes(): FilterValue[] {
    return this.filterService.filterFuelTypes;
  }

  getFilterGearboxes(): FilterValue[] {
    return this.filterService.filterGearboxes;
  }

  getOptions(carId: string): Observable<Option[]> {
    return this.optionService.find(carId);
  }

  addOption(option: Option): void {
    this.store.dispatch(new AddOptionAction(option));
  }

  removeOption(optionId: string): void{
    this.store.dispatch(new RemoveOptionAction(optionId));
  }

  clearOptions(): void {
    this.store.dispatch(new ClearOptionsAction());
  }
}
