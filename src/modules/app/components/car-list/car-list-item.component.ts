import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Car } from '../../types/car.type';

@Component({
  selector: 'app-car-list-item',
  styleUrls: ['./car-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="car-image" [ngStyle]="{'background-image': 'url(' + car?.imgUrl + ')'}"></div>
    <div class="description">
      <div class="make">{{car?.make?.name}}</div>
      <div class="model">{{car?.model}}</div>
    </div>
  `
})
export class CarListItemComponent {
 @Input() car: Car;
}