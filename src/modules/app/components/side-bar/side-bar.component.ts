import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Car } from '../../types/car.type';

@Component({
  selector: 'app-side-bar',
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-active-selection *ngIf="car"
                          [car]="car"></app-active-selection>
    
    <ng-content></ng-content>
  `
})
export class SideBarComponent {
  @Input() car: Car;
}
