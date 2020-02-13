import {Injectable} from '@angular/core';
import {FilterService} from './services/filter.service';
import {CarService} from './services/car.service';
import {FilterValue} from './types/filter-value.type';
import {Observable} from 'rxjs';
import {Car} from './types/car.type';

@Injectable({
  providedIn: 'root'
})
export class AppSandbox {
  constructor(private filterService: FilterService,
              private carService: CarService) {
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

  getCars(): Observable<Car[]> {
    return this.carService.find();
  }
}
