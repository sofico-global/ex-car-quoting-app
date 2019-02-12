import {
  Component,
  OnInit
} from '@angular/core';
import { Option } from '../../types/option.type';
import { Observable } from 'rxjs';
import { Car } from '../../types/car.type';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { CarService } from '../../services/car.service';
import {
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import { OptionService } from '../../services/option.service';

@Component({
  selector: 'app-options',
  styleUrls: ['./options.container.scss'],
  template: `
    <div class="row">
      <div class="col-8">
        <h2>Packs</h2>
        <br>
        <app-option-list [options]="packs$ | async"></app-option-list>
        <h2>Options</h2>
        <br>
        <app-option-list [options]="options$ | async"></app-option-list>
      </div>
      <div class="col-4">
        <app-side-bar [car]="activeSelection$ | async"></app-side-bar>
      </div>
    </div>
  `
})
export class OptionsContainer implements OnInit {
  // source streams
  carId$: Observable<string>;

  // intermediate streams
  catalogOptions$: Observable<Option[]>;

  // presentation streams
  activeSelection$: Observable<Car>;
  packs$: Observable<Option[]>;
  options$: Observable<Option[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private filterService: FilterService,
              private carService: CarService,
              private optionService: OptionService) {
  }

  ngOnInit(): void {
    // source streams
    this.carId$ = this.activatedRoute.params.pipe(
      filter(params => params && params.carId),
      map(params => params.carId)
    );

    // intermediate streams
    this.catalogOptions$ = this.carId$.pipe(
      switchMap(carId => this.optionService.find(carId))
    );

    // presentation streams
    this.activeSelection$ = this.carId$.pipe(
      switchMap(carId => this.carService.findOne(carId))
    );
    this.packs$ = this.catalogOptions$.pipe(
      map(options => options.filter(option => option.optionType === 'pack'))
    );
    this.options$ = this.catalogOptions$.pipe(
      map(options => options.filter(option => option.optionType === 'option'))
    );
  }
}
