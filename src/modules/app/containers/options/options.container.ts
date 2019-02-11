import {
  Component,
  OnInit
} from '@angular/core';
import { Option } from '../../types/option.type';
import { Observable } from 'rxjs';
import { Car } from '../../types/car.type';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { CarService } from '../../services/car.service';
import {
  filter,
  map,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-options',
  styleUrls: ['./options.container.scss'],
  template: `    
    <div class="row">
      <div class="col-8">
        <h2>Packs</h2>
        <br>
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
      </div>
      <div class="col-4">
        <div class="filters">
          <app-active-selection *ngIf="activeSelection$ | async as activeSelection"
                                [car]="activeSelection"></app-active-selection>
        </div>
      </div>
    </div>
  `
})
export class OptionsContainer implements OnInit {
  options: Option[] = [
    {
      optionId: '1',
      description: 'Technology pack',
      optionCode: 'ABC123',
      price: 1500
    },
    {
      optionId: '2',
      description: 'Heated seats',
      optionCode: 'ABC124',
      price: 700
    }
  ];

  // source streams
  carId$: Observable<string>;

  // presentation streams
  activeSelection$: Observable<Car>;

  constructor(private activatedRoute: ActivatedRoute,
              private filterService: FilterService,
              private carService: CarService) {
  }

  ngOnInit(): void {
    // source streams
    this.carId$ = this.activatedRoute.params.pipe(
      filter(params => params && params.carId),
      map(params => params.carId)
    );

    // presentation streams
    this.activeSelection$ = this.carId$.pipe(
      switchMap(carId => this.carService.findOne(carId))
    );
  }
}
