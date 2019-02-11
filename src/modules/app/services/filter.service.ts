import { Injectable } from '@angular/core';
import { FilterValue } from '../types/filter-value.type';

@Injectable()
export class FilterService {
  filterMakes: FilterValue[] = [
    {
      filterId: 'audi',
      value: 'Audi'
    },
    {
      filterId: 'bmw',
      value: 'BMW'
    },
    {
      filterId: 'mercedes',
      value: 'Mercedes'
    },
    {
      filterId: 'volkswagen',
      value: 'Volkswagen'
    }
  ];
  filterFuelTypes: FilterValue[] = [
    {
      filterId: 'petrol',
      value: 'Petrol'
    },
    {
      filterId: 'diesel',
      value: 'Diesel'
    }
  ];
  filterGearboxes: FilterValue[] = [
    {
      filterId: 'manual',
      value: 'Manual'
    },
    {
      filterId: 'automatic',
      value: 'Automatic'
    }
  ];
}
