import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class LeasePriceService {
  calculate(carId: string, optionIds: string[]): Observable<number> {
    return of((Math.random() * 500) + 500).pipe(delay(2000));
  }
}
