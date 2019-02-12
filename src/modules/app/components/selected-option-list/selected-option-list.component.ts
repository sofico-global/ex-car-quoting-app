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
    <div *ngFor="let option of selectedOptions" class="list-item">
      <div>{{option?.description}}</div>
      <div>{{option?.price | currency}}</div>
    </div>
  `
})
export class SelectedOptionListComponent {
  @Input() selectedOptions: Option[];
}
