import {
  Component,
  forwardRef,
  Input
} from '@angular/core';
import { FilterValue } from '../../types/filter-value.type';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';


@Component({
  selector: 'app-form-control-multi-checkbox',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlMultiCheckboxComponent),
      multi: true
    }
  ],
  template: `
    <ng-container *ngFor="let filter of filters">
      <div class="form-check">
        <input class="form-check-input" 
               type="checkbox" 
               [checked]="isChecked(filter)"
               [id]="filter?.filterId"
               (input)="onToggle($event?.target?.checked, filter)">
        <label class="form-check-label" [for]="filter?.filterId">{{filter?.value}}</label>
      </div>
    </ng-container>
  `
})
export class FormControlMultiCheckboxComponent implements ControlValueAccessor {
  @Input() filters: FilterValue[];

  private internalValue: FilterValue[] = [];
  private propagateChange: any = () => {
  };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: missing implementation
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: missing implementation
  }

  writeValue(filterValue: FilterValue[]): void {
    this.internalValue = Array.isArray(filterValue) ? filterValue : [];
  }

  onToggle(checked: boolean, filter: FilterValue): void {
    if (!checked) {
      this.internalValue = this.internalValue.filter(internalFilter => internalFilter.filterId !== filter.filterId);
    } else {
      this.internalValue = [...this.internalValue, filter];
    }

    this.propagateChange(this.internalValue);
  }

  isChecked(filter: FilterValue): boolean {
    return !!this.internalValue.find(internalFilter => internalFilter.filterId === filter.filterId);
  }
}
