import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Car } from '../../types/car.type';
import { Option } from '../../types/option.type';

@Component({
  selector: 'app-option-list',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="table">
      <thead>
      <tr>
        <th></th>
        <th>Description</th>
        <th>Option code</th>
        <th class="text-right">Price</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let option of options">
        <td>
          <input type="checkbox" name="" id="">
        </td>
        <td>{{option?.description}}</td>
        <td>{{option?.optionCode}}</td>
        <td class="text-right">{{option?.price | currency}}</td>
      </tr>
      </tbody>
    </table>
  `
})
export class OptionsListComponent {
  @Input() options: Option[];

  tracker = (i) => i;
}
