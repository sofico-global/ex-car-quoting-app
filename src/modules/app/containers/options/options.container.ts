import {
  Component,
  OnInit
} from '@angular/core';
import { Option } from '../../types/option.type';
import {
  combineLatest,
  Observable
} from 'rxjs';
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
import { ApplicationState } from '../../../statemanagement/application.state';
import {
  select,
  Store
} from '@ngrx/store';
import {
  AddOptionAction,
  RemoveOptionAction
} from '../../../statemanagement/actions';
import {
  sortBy,
  unionBy
} from 'lodash';

@Component({
  selector: 'app-options',
  styleUrls: ['./options.container.scss'],
  template: `
    <div class="row">
      <div class="col-8">
        <h2>Packs</h2>
        <br>
        <app-option-list [options]="packs$ | async"
                         (addOption)="onAddOption($event)"
                         (removeOption)="onRemoveOption($event)"></app-option-list>
        <h2>Options</h2>
        <br>
        <app-option-list [options]="options$ | async"
                         (addOption)="onAddOption($event)"
                         (removeOption)="onRemoveOption($event)"></app-option-list>
      </div>
      <div class="col-4">
        <app-side-bar [car]="activeSelection$ | async"
                      [selectedOptions]="selectedCatalogOptions$ | async"
                      [selectedOptionsEnabled]="true">
        </app-side-bar>
      </div>
    </div>
  `
})
export class OptionsContainer implements OnInit {
  // source streams
  carId$: Observable<string>;

  // intermediate streams
  catalogOptions$: Observable<Option[]>;
  selectedCatalogOptions$: Observable<Option[]>;
  combinedCatalogOptions$: Observable<Option[]>;

  // presentation streams
  activeSelection$: Observable<Car>;
  packs$: Observable<Option[]>;
  options$: Observable<Option[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private filterService: FilterService,
              private carService: CarService,
              private optionService: OptionService,
              private store: Store<ApplicationState>) {
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
    this.selectedCatalogOptions$ = this.store.pipe(select(state => state.options));
    this.combinedCatalogOptions$ = combineLatest(
      this.catalogOptions$,
      this.selectedCatalogOptions$
    ).pipe(
      map(([catalogOptions, selectedCatalogOptions]) => unionBy(selectedCatalogOptions, catalogOptions, 'optionId')),
      map(catalogOptions => sortBy(catalogOptions, 'description'))
    );

    // presentation streams
    this.activeSelection$ = this.carId$.pipe(
      switchMap(carId => this.carService.findOne(carId))
    );
    this.packs$ = this.combinedCatalogOptions$.pipe(
      map(options => options.filter(option => option.optionType === 'pack'))
    );
    this.options$ = this.combinedCatalogOptions$.pipe(
      map(options => options.filter(option => option.optionType === 'option'))
    );
  }

  onAddOption(option: Option): void {
    this.store.dispatch(new AddOptionAction(option));
  }

  onRemoveOption(optionId: string): void {
    this.store.dispatch(new RemoveOptionAction(optionId));
  }
}
