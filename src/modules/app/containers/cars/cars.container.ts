import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Car} from '../../types/car.type';
import {debounceTime, distinctUntilChanged, filter, map, shareReplay} from 'rxjs/operators';
import {FilterValue} from '../../types/filter-value.type';
import {ActivatedRoute} from '@angular/router';
import {AppSandbox} from '../../app.sandbox';

@Component({
  selector: 'app-cars',
  styleUrls: ['./cars.container.scss'],
  template: `
    <div class="row">
      <div class="col-sm-7 col-md-8">
        <div class="form-group">
          <input #searchRef
                 type="text"
                 class="form-control"
                 placeholder="Search your car"
                 (input)="searchTerm$.next(searchRef?.value)">
        </div>
        <p class="text-right">{{numberOfCars$ | async}} car(s) displayed</p>
        <app-car-list [cars]="filteredCars$ | async"></app-car-list>
      </div>
      <div class="col-sm-5 col-md-4">
        <app-side-bar
          [car]="null"
          [form]="form"
          [filterMakes]="filterMakes"
          [filterFuelTypes]="filterFuelTypes"
          [filterGearboxes]="filterGearboxes"
          [filtersEnabled]="true"
        ></app-side-bar>
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
  searchTerm$ = new BehaviorSubject('');
  cars$: Observable<Car[]>;

  // intermediate streams
  optimizedSearchTerm$: Observable<string>;

  // presentation streams
  filteredCars$: Observable<Car[]>;
  numberOfCars$: Observable<number>;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private sb: AppSandbox) {
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
    this.cars$ = this.sb.getCars().pipe(
      shareReplay({refCount: true})
    );

    // intermediate streams
    this.optimizedSearchTerm$ = this.searchTerm$.pipe(
      filter(searchTerm => searchTerm.length === 0 || searchTerm.length > 3),
      distinctUntilChanged(),
      debounceTime(200)
    );

    // presentation streams
    this.filteredCars$ = combineLatest([
      this.cars$,
      this.optimizedSearchTerm$
    ]).pipe(
      map(([cars, searchTerm]) => {
        return cars.filter(car =>
          (car.make.name + car.model + car.type).toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
    this.numberOfCars$ = this.filteredCars$.pipe(
      map(cars => cars.length)
    );
  }
}
