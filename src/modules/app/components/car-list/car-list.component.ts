import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Car} from '../../types/car.type';

@Component({
  selector: 'app-car-list',
  styleUrls: ['./car-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row">
      <div *ngFor="let car of cars;" class="col-sm-12 col-md-6">
        <app-car-list-item [car]="car" [routerLink]="['/', 'configurator', car?.carId, 'options']"></app-car-list-item>
      </div>
    </div>
  `
})
export class CarListComponent {
  @Input() cars: Car[];

  // TODO: create a trackBy function based in the index
  // TODO: apply the trackBy accordingly to the ngFor
  trackByFn = null;

}
