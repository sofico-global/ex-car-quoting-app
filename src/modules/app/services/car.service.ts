import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Car} from '../types/car.type';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class CarService {
  constructor(private httpClient: HttpClient) {
  }

  find(): Observable<Car[]> {
    return this.httpClient.get<Car[]>('https://sofico-global.github.io/ex-car-quoting-app/data.json');
  }

  findOne(carId: string): Observable<Car> {
    return this.httpClient.get<Car[]>('https://sofico-global.github.io/ex-car-quoting-app/data.json').pipe(
      map(cars => cars.find(car => car.carId === carId))
    );
  }
}
