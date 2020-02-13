import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Car} from '../../types/car.type';
import {filter, map} from 'rxjs/operators';
import {FilterValue} from '../../types/filter-value.type';
import {ActivatedRoute} from '@angular/router';
import {FilterService} from '../../services/filter.service';
import {CarService} from '../../services/car.service';

@Component({
  selector: 'app-cars',
  styleUrls: ['./cars.container.scss'],
  template: `
    <div class="row">
      <div class="col-sm-7 col-md-8">
        <div class="form-group">
          <input type="text"
                 class="form-control"
                 placeholder="Search your car">
        </div>
        <app-car-list [cars]="cars$ | async"></app-car-list>
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

  // presentation streams
  // TODO: initialize the stream with the correct observable
  cars$: Observable<Car[]>;

  // TODO: import the correct service to fetch the list of cars
  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private filterService: FilterService,
              private  carService: CarService) {
  }

  ngOnInit(): void {
    this.filterMakes = this.filterService.filterMakes;
    this.filterFuelTypes = this.filterService.filterFuelTypes;
    this.filterGearboxes = this.filterService.filterGearboxes;

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

    // presentation streams
    this.cars$ = this.carService.find();
  }
}
