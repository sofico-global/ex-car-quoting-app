import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  combineLatest,
  Observable
} from 'rxjs';
import { Car } from '../../types/car.type';
import {
  filter,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import { FilterValue } from '../../types/filter-value.type';
import { ActivatedRoute } from '@angular/router';
import { AppSandbox } from '../../app.sandbox';

@Component({
  selector: 'app-cars',
  styleUrls: ['./cars.container.scss'],
  template: `
    <div class="row">
      <div class="col-8">
        <app-car-list [cars]="filteredCars$ | async"></app-car-list>
      </div>
      <div class="col-4">
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
      map(params => params.carId),
    );
    this.cars$ = this.sb.getCars();

    // presentation streams
    this.filteredCars$ = combineLatest(
      this.cars$,
      this.form.get('makes').valueChanges.pipe(startWith([])),
      this.form.get('fuelTypes').valueChanges.pipe(startWith([])),
      this.form.get('gearboxes').valueChanges.pipe(startWith([]))
    ).pipe(
      map(([cars, filterMakes, filterFuelTypes, filterGearboxes]) =>
        this.filterCars(
          cars,
          filterMakes,
          filterFuelTypes,
          filterGearboxes)
      )
    );
    this.activeSelection$ = this.carId$.pipe(
      switchMap(carId => this.sb.getCar(carId))
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
