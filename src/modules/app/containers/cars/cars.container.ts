import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Car} from '../../types/car.type';
import {filter, map, debounceTime, distinctUntilChanged, distinct} from 'rxjs/operators';
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
    this.cars$ = this.sb.getCars();

    // intermediate streams
    // TODO: the search term must only pass when:
    // TODO: - the term consists our of more than 3 characters, make sure you cover the case when the searchTerm's number of characters is 0 (filter)
    // TODO: - don't allow twice (just after each other) the same term (distinct...)
    // TODO: - make sure that the term is only passed down when the user has stopped typing for 200ms (debounceTime)
    this.optimizedSearchTerm$ = this.searchTerm$;

    // presentation streams
    // TODO: make sure the filteredCars$ observable makes us of the optimizedSearchTerm$ observable
    this.filteredCars$ = combineLatest([
      this.cars$,
      this.searchTerm$
    ]).pipe(
      map(([cars, searchTerm]) => {
        return cars.filter(car =>
          (car.make.name + car.model + car.type).toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }
}
