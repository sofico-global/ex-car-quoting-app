import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-car-list',
  styleUrls: ['./car-list.component.scss'],
  template: `
    <div class="row">
      <div *ngFor="let car of cars; trackBy: tracker" class="col-sm-2 col-md-4">
        <app-car-list-item [car]="car"></app-car-list-item>
      </div>
    </div>
  `
})
export class CarListComponent {
  @Input() cars: any[];

  tracker = (i) => i;
}
