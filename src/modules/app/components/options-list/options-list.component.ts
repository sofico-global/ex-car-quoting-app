import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Option } from '../../types/option.type';

@Component({
  selector: 'app-option-list',
  styleUrls: ['./options-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="options?.length > 0; else noOptions">
      <table class="table">
        <thead>
        <tr>
          <th *ngIf="!disabled"></th>
          <th>Description</th>
          <th>Option code</th>
          <th class="text-right">Price</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let option of options">
          <td *ngIf="!disabled">
            <input type="checkbox"
                   [checked]="option?.isSelected"
                   (change)="onToggleOption(option, $event.target.checked)">
          </td>
          <td>{{option?.description}}</td>
          <td>{{option?.optionCode}}</td>
          <td class="text-right">{{option?.price | currency: 'EUR' : 'symbol'}}</td>
        </tr>
        </tbody>
      </table>
    </ng-container>
    <ng-template #noOptions>
      <p>No options available.</p>
    </ng-template>
  `
})
export class OptionsListComponent {
  @Input() options: Option[];
  @Input() disabled = false;
  @Output() addOption = new EventEmitter<Option>();
  @Output() removeOption = new EventEmitter<string>();

  onToggleOption(option: Option, checked: boolean): void {
    if (checked) {
      this.addOption.emit(option);
    } else {
      this.removeOption.emit(option.optionId);
    }
  }
}
