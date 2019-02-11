import {
  Component,
  Input
} from '@angular/core';
import { Car } from '../../types/car.type';

@Component({
  selector: 'app-active-selection',
  styleUrls: ['./active-selection.component.scss'],
  template: `
    <div class="image" [ngStyle]="{'background-image': 'url(' + car?.imgUrl + ')'}"></div>
    <div class="specifications">
      <div class="make">{{car?.make?.name}}</div>
      <div class="model">{{car?.model}}</div>
    </div>
  `
})
export class ActiveSelectionComponent {
  @Input() car: Car;
}
