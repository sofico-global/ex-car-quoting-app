import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Option } from '../../types/option.type';

@Component({
  selector: 'app-selected-option-list-item',
  styleUrls: ['./selected-option-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="d-flex justify-content-between">
        <div>{{option?.description}}</div>
        <div>{{option?.price | currency: 'EUR' : 'symbol'}}</div>
      </div>
  `
})
export class SelectedOptionListItemComponent {
  @Input() option: Option;
}
