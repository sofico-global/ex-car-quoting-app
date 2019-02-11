import {
  Component,
  Input
} from '@angular/core';
import { Car } from '../../types/car.type';

@Component({
  selector: 'app-car-list',
  styleUrls: ['./car-list.component.scss'],
  template: `
    <div class="row">
      <div *ngFor="let car of cars; trackBy: tracker" class="col-sm-2 col-md-6">
        <app-car-list-item [car]="car" [routerLink]="['/', 'configurator', car?.carId, 'options']"></app-car-list-item>
      </div>
    </div>
  `
})
export class CarListComponent {
  @Input() cars: Car[];

  tracker = (i) => i;
}
