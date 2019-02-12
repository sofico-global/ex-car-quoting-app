import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Option } from '../../types/option.type';

@Component({
  selector: 'app-selected-option-list',
  styleUrls: ['./selected-option-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h5>Selected options</h5>
    <ng-container *ngIf="options && options?.length > 0; else noOptions">
      <app-selected-option-list-item *ngFor="let option of options"
                                     [option]="option"></app-selected-option-list-item>
    </ng-container>
    <ng-template #noOptions>
      No options selected.
    </ng-template>
  `
})
export class SelectedOptionListComponent {
  @Input() options: Option[];
}
