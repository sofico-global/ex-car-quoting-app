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
import { AppSandbox } from '../../app.sandbox';

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
                      [leasePrice]="leasePrice$ | async"
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
  leasePrice$: Observable<number>;

  constructor(private sb: AppSandbox,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // source streams
    this.carId$ = this.activatedRoute.params.pipe(
      filter(params => params && params.carId),
      map(params => params.carId)
    );

    // intermediate streams
    this.catalogOptions$ = this.carId$.pipe(
      switchMap(carId => this.sb.getOptions(carId))
    );
    this.selectedCatalogOptions$ = this.sb.selectedOptions$;
    this.combinedCatalogOptions$ = combineLatest(
      this.catalogOptions$,
      this.selectedCatalogOptions$
    ).pipe(
      map(([catalogOptions, selectedCatalogOptions]) => unionBy(selectedCatalogOptions, catalogOptions, 'optionId')),
      map(catalogOptions => sortBy(catalogOptions, 'description'))
    );

    // presentation streams
    this.activeSelection$ = this.carId$.pipe(
      switchMap(carId => this.sb.getCar(carId))
    );
    this.packs$ = this.combinedCatalogOptions$.pipe(
      map(options => options.filter(option => option.optionType === 'pack'))
    );
    this.options$ = this.combinedCatalogOptions$.pipe(
      map(options => options.filter(option => option.optionType === 'option'))
    );
    this.leasePrice$ = this.sb.leasePrice$;
  }

  onAddOption(option: Option): void {
    this.sb.addOption(option);
  }

  onRemoveOption(optionId: string): void {
    this.sb.removeOption(optionId);
  }
}
