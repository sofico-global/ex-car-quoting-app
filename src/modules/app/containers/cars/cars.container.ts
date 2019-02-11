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
import { CarService } from '../../services/car.service';
import { FilterValue } from '../../types/filter-value.type';
import { FilterService } from '../../services/filter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars',
  styleUrls: ['./cars.container.scss'],
  template: `
    <div class="row">
      <div class="col-8">
        <app-car-list [cars]="filteredCars$ | async"></app-car-list>
      </div>
      <div class="col-4">
        <div class="filters">
          <app-active-selection *ngIf="activeSelection$ | async as activeSelection" 
                                [car]="activeSelection"></app-active-selection>
          <br>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, beatae commodi corporis dolor ducimus earum illum in iusto
          nulla perferendis quis quod, recusandae temporibus? Culpa deleniti dolore itaque qui sapiente.
        </div>
        <br>
        <div class="filters">
          <h6>Make</h6>
          <app-form-control-multi-checkbox *ngIf="form.get('makes') as ctrl"
                                           [formControl]="ctrl"
                                           [filters]="filterMakes"></app-form-control-multi-checkbox>
          <br>
          <h6>Fuel type</h6>
          <app-form-control-multi-checkbox *ngIf="form.get('fuelTypes') as ctrl"
                                           [formControl]="ctrl"
                                           [filters]="filterFuelTypes"></app-form-control-multi-checkbox>
          <br>
          <h6>Gearbox</h6>
          <app-form-control-multi-checkbox *ngIf="form.get('gearboxes') as ctrl"
                                           [formControl]="ctrl"
                                           [filters]="filterGearboxes"></app-form-control-multi-checkbox>
        </div>
      </div>
    </div>  `
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

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private filterService: FilterService,
              private carService: CarService) {
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
      map(params => params.carId),
    );
    this.cars$ = this.carService.find();

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
      switchMap(carId => this.carService.findOne(carId))
    );
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
