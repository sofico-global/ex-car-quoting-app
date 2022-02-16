import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {Car} from '../../types/car.type';
import {filter, map} from 'rxjs/operators';
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
          <input type="text"
                 class="form-control"
                 placeholder="Search your car"
                 (input)="searchTerm$.next($event?.target?.value)">
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

    // presentation streams
    // TODO: combine both the cars$ observable as the searchTerm$ observable, using both create a filtered cars list
    // TODO: tip: combineLatest
    // TODO: Add the following operator after `combineLatest`. This will make sure the list is properly filtered when a user searches.
    // .pipe(
    //  map(([cars, searchTerm]) => {
    //    return cars.filter(car =>
    //      (car.make.name + car.model + car.type).toLowerCase().includes(searchTerm.toLowerCase())
    //    );
    //  })
    //)
    this.filteredCars$ = this.cars$;
  }
}
