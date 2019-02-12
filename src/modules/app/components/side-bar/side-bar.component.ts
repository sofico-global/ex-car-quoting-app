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
    <app-active-car-selection *ngIf="car" [car]="car"></app-active-car-selection>
    
    <app-lease-price *ngIf="car" [leasePrice]="leasePrice"></app-lease-price>
    
    <app-filters *ngIf="filtersEnabled"
                 [form]="form"
                 [filterMakes]="filterMakes"
                 [filterFuelTypes]="filterFuelTypes"
                 [filterGearboxes]="filterGearboxes"></app-filters>
    
    <app-selected-option-list *ngIf="selectedOptionsEnabled"
                              [options]="selectedOptions"></app-selected-option-list>
  `
})
export class SideBarComponent {
  @Input() car: Car;
  @Input() form: FormGroup;
  @Input() filterMakes: FilterValue[];
  @Input() filterFuelTypes: FilterValue[];
  @Input() filterGearboxes: FilterValue[];
  @Input() selectedOptions: Option[];
  @Input() leasePrice: number;

  @Input() filtersEnabled = false;
  @Input() selectedOptionsEnabled = false;
}
