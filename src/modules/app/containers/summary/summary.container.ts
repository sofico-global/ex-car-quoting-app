import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Option } from '../../types/option.type';
import {
  select,
  Store
} from '@ngrx/store';
import { ApplicationState } from '../../../statemanagement/application.state';
import { Car } from '../../types/car.type';
import {
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-summary',
  template: `
    <div class="row">
      <div class="col-8">
        <h2>Selected options</h2>
        <br>
        <app-option-list [options]="selectedOptions$ | async" [disabled]="true"></app-option-list>
      </div>
      <div class="col-4">
        <app-side-bar [car]="activeSelection$ | async"></app-side-bar>
      </div>
    </div>
  `
})
export class SummaryContainer implements OnInit {
  // source streams
  carId$: Observable<string>;

  // presentation streams
  activeSelection$: Observable<Car>;
  selectedOptions$: Observable<Option[]>;

  constructor(private store: Store<ApplicationState>,
              private activatedRoute: ActivatedRoute,
              private carService: CarService) {
  }

  ngOnInit(): void {
    // source streams
    this.carId$ = this.activatedRoute.params.pipe(
      filter(params => params && params.carId),
      map(params => params.carId)
    );


    // presentation streams
    this.activeSelection$ = this.carId$.pipe(
      switchMap(carId => this.carService.findOne(carId))
    );
    this.selectedOptions$ = this.store.pipe(
      select(state => state.options),
      map(catalogOptions => sortBy(catalogOptions, 'description'))
    );
  }
}
