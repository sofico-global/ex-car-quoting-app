import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { Car } from '../types/car.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class CarService {
  constructor(private httpClient: HttpClient) {}

  find(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(environment.baseUrl + 'cars');
  }

  findOne(carId: string): Observable<Car> {
    return this.httpClient.get<Car>(environment.baseUrl + 'cars/' + carId);
  }
}
