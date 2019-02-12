import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  filter,
  map,
  startWith,
  tap
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Step } from '../../types/step.type';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../statemanagement/application.state';
import { ClearOptionsAction } from '../../../statemanagement/actions';

@Component({
  selector: 'app-configurator',
  template: `
    <div class="steps">
      <ng-container *ngFor="let step of steps$ | async">
        <ng-container *ngIf="step?.accessible; else notAccessible">
          <a [routerLink]="step.path"
             routerLinkActive="active"
             class="step step-accessible">{{step?.label}}</a>
        </ng-container>
        <ng-template #notAccessible>
          <div class="step">{{step?.label}}</div>
        </ng-template>
      </ng-container>
    </div>
    <br>
    <router-outlet></router-outlet>
  `
})
export class ConfiguratorContainer implements OnInit {
  // source streams
  carId$ = this.activatedRoute.params.pipe(
    filter(params => params && params.carId),
    map(params => params.carId)
  );

  // presentation streams
  steps$: Observable<Step[]> = this.carId$.pipe(
    startWith(null),
    map(carId => {
      return [
        {
          label: 'Car',
          path: '/configurator/' + (carId ? carId + '/cars' : 'cars'),
          accessible: true
        },
        {
          label: 'Options',
          path: carId ? '/configurator/' + carId + '/options' : null,
          accessible: !!carId
        },
        {
          label: 'Summary',
          path: carId ? '/configurator/' + carId + '/summary' : null,
          accessible: !!carId
        }
      ];
    })
  );

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<ApplicationState>) {
  }

  ngOnInit(): void {
    this.carId$.subscribe(() => {
      this.store.dispatch(new ClearOptionsAction());
    });
  }
}
