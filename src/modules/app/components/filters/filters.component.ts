import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { FilterValue } from '../../types/filter-value.type';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h5>Filters</h5>
    <h6>Make</h6>
    <app-form-control-multi-checkbox *ngIf="form.controls.makes as ctrl"
                                     [formControl]="$any(ctrl)"
                                     [filters]="filterMakes"></app-form-control-multi-checkbox>
    <br>
    <h6>Fuel type</h6>
    <app-form-control-multi-checkbox *ngIf="form.controls.fuelTypes as ctrl"
                                     [formControl]="$any(ctrl)"
                                     [filters]="filterFuelTypes"></app-form-control-multi-checkbox>
    <br>
    <h6>Gearbox</h6>
    <app-form-control-multi-checkbox *ngIf="form.controls.gearboxes as ctrl"
                                     [formControl]="$any(ctrl)"
                                     [filters]="filterGearboxes"></app-form-control-multi-checkbox>
  `
})
export class FiltersComponent {
  @Input() form: FormGroup;
  @Input() filterMakes: FilterValue[];
  @Input() filterFuelTypes: FilterValue[];
  @Input() filterGearboxes: FilterValue[];
}
