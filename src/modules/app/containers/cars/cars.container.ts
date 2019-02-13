import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  Observable
} from 'rxjs';
import { Car } from '../../types/car.type';
import {
  debounceTime,
  filter,
  map,
  mergeMap,
  startWith
} from 'rxjs/operators';
import { FilterValue } from '../../types/filter-value.type';
import { ActivatedRoute } from '@angular/router';
import { AppSandbox } from '../../app.sandbox';

@Component({
  selector: 'app-cars',
  styleUrls: ['./cars.container.scss'],
  template: `
    <div class="row">
      <div class="col-sm-7 col-md-8">
        <div class="form-group">
          <input type="text" 
                 class="form-control" 
                 placeholder="Search your car" 
                 (keyup)="searchTerm$.next($event.target.value)">
        </div>
        <app-car-list [cars]="filteredCars$ | async"></app-car-list>
      </div>
      <div class="col-sm-5 col-md-4">
        <app-side-bar [car]="activeSelection$ | async"
                      [form]="form"
                      [filterMakes]="filterMakes"
                      [filterFuelTypes]="filterFuelTypes"
                      [filterGearboxes]="filterGearboxes"
                      [filtersEnabled]="true"
                      [leasePrice]="leasePrice$ | async">
        </app-side-bar>
      </div>
    </div>`
})
export class CarsContainer implements OnInit {
  filterMakes: FilterValue[];
  filterFuelTypes: FilterValue[];
  filterGearboxes: FilterValue[];

  form: FormGroup;

  // source streams
  carId$: Observable<string>;
  cars$: Observable<Car[]>;
  searchTerm$: BehaviorSubject<string>;

  // intermediate streams
  optimizedSeachTerm$: Observable<string>;

  // presentation streams
  filteredCars$: Observable<Car[]>;
  activeSelection$: Observable<Car>;
  leasePrice$: Observable<number>;

  constructor(private sb: AppSandbox,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.filterMakes = this.sb.getFilterMakes();
    this.filterFuelTypes = this.sb.getFilterFuelTypes();
    this.filterGearboxes = this.sb.getFilterGearboxes();

    this.form = this.fb.group({
      makes: [[]],
      fuelTypes: [[]],
      gearboxes: [[]]
    });

    // source streams
    this.carId$ = this.activatedRoute.params.pipe(
      filter(params => params && params.carId),
      map(params => params.carId)
    );
    this.cars$ = this.sb.getCars();
    this.searchTerm$ = new BehaviorSubject('');

    // intermediate streams
    this.optimizedSeachTerm$ = this.searchTerm$.pipe(debounceTime(200));

    // presentation streams
    this.filteredCars$ = combineLatest(
      this.cars$,
      this.optimizedSeachTerm$,
      this.form.get('makes').valueChanges.pipe(startWith([])),
      this.form.get('fuelTypes').valueChanges.pipe(startWith([])),
      this.form.get('gearboxes').valueChanges.pipe(startWith([]))
    ).pipe(
      map(([cars, searchTerm, filterMakes, filterFuelTypes, filterGearboxes]) => {
        const searchResult = cars.filter(car => {
          const searchableString = car.make.name + car.model;
          return searchableString.toLowerCase().includes(searchTerm.toLowerCase());
        });

        return this.filterCars(
          searchResult,
          filterMakes,
          filterFuelTypes,
          filterGearboxes
        );
      })
    );
    this.activeSelection$ = this.carId$.pipe(
      mergeMap(carId => this.sb.getCar(carId))
    );
    this.leasePrice$ = this.sb.leasePrice$;
  }

  private filterCars(
    cars: Car[],
    filterMakes: FilterValue[],
    filterFuelTypes: FilterValue[],
    filterGearboxes: FilterValue[]
  ): Car[] {
    let tmpCars = cars;

    if (filterMakes.length > 0) {
      tmpCars = tmpCars.filter(car => !!filterMakes.find(filter => filter.filterId === car.make.makeId));
    }

    if (filterFuelTypes.length > 0) {
      tmpCars = tmpCars.filter(car => !!filterFuelTypes.find(filter => filter.filterId === car.fuelType.fuelTypeId));
    }

    if (filterGearboxes.length > 0) {
      tmpCars = tmpCars.filter(car => !!filterGearboxes.find(filter => filter.filterId === car.gearbox.gearboxId));
    }

    return tmpCars;
  }
}
