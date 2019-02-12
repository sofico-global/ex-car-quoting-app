import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Car } from '../../types/car.type';
import { FormGroup } from '@angular/forms';
import { FilterValue } from '../../types/filter-value.type';
import { Option } from '../../types/option.type';

@Component({
  selector: 'app-side-bar',
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="car">
      <app-active-selection [car]="car"></app-active-selection>

      <hr>

      <div class="lease-price-section d-flex justify-content-between align-items-center">
        <div>Monthly rental</div>
        <div class="lease-price text-primary">€ 520,50</div>
      </div>
    </ng-container>

    <hr *ngIf="car && (filtersEnabled  || selectedOptionsEnabled)">

    <app-filters *ngIf="filtersEnabled"
                 [form]="form"
                 [filterMakes]="filterMakes"
                 [filterFuelTypes]="filterFuelTypes"
                 [filterGearboxes]="filterGearboxes"></app-filters>

    <app-selected-option-list *ngIf="selectedOptionsEnabled"
                              [selectedOptions]="selectedOptions"></app-selected-option-list>
  `
})
export class SideBarComponent {
  @Input() car: Car;
  @Input() form: FormGroup;
  @Input() filterMakes: FilterValue[];
  @Input() filterFuelTypes: FilterValue[];
  @Input() filterGearboxes: FilterValue[];
  @Input() selectedOptions: Option[];

  @Input() filtersEnabled = false;
  @Input() selectedOptionsEnabled = false;
}
