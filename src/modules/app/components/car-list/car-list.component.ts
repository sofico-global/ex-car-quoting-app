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
  // TODO: as a dumb component it's not allowed to fetch data
  // TODO: move the responsibilities of fetching data to the respective smart component
  // TODO: and pass along the data from top to bottom using the @Input decorator
  // TODO: update the template accordingly (tip: the "| async" pipe is not needed anymore)
  @Input() cars: Car[];
}
