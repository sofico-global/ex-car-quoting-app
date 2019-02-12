import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Car } from '../../types/car.type';

@Component({
  selector: 'app-lease-price',
  styleUrls: ['./lease-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lease-price-section">
      <div>Monthly rental</div>
      <ng-container *ngIf="leasePrice; else calculating">
        <div class="lease-price text-primary">{{leasePrice | currency: 'EUR' : 'symbol'}}</div>
      </ng-container>
      <ng-template #calculating>
        <div class="spinner-border text-secondary">
          <span class="sr-only">Loading...</span>
        </div>
      </ng-template>
    </div>
  `
})
export class LeasePriceComponent {
  @Input() leasePrice: number;
}
