import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-car-list-item',
  styleUrls: ['./car-list-item.component.scss'],
  template: `
    <div class="car-image" [ngStyle]="{'background-image': 'url(' + car.imgUrl + ')'}"></div>
    <div class="description">
      <div class="make">{{car.make}}</div>
      <div class="model">{{car.model}}</div>
    </div>
  `
})
export class CarListItemComponent {
 @Input() car: any;
}
