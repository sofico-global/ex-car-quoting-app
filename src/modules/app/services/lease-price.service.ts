import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class LeasePriceService {
  constructor(private httpClient: HttpClient) {
  }

  calculate(carId: string, optionIds: string[]): Observable<number> {
    let params = new HttpParams().append('car_id', carId);
    params = optionIds.reduce((acc, cur) => acc.append('option_id', cur), params);

    return this.httpClient.get<number>(environment.baseUrl + 'lease-price', {params}).pipe(
      delay(1500)
    );
  }
}
