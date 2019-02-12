import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { Car } from '../types/car.type';

@Injectable()
export class CarService {
  private cars: Car[] = [
    {
      carId: '1',
      make: {
        makeId: 'audi',
        name: 'Audi'
      },
      model: 'A3 Sportback',
      type: '1.6 30 TDi 85kW',
      imgUrl: 'https://www.nl.audi.be/content/dam/nemo/models/a3/a3-sportback/my-2019/1920x1080-mtc-xl-16-9/AA3_SB_161005_1.jpg',
      fuelType: {
        fuelTypeId: 'petrol',
        name: 'Petrol'
      },
      gearbox: {
        gearboxId: 'manual',
        name: 'Manual'
      }
    },
    {
      carId: '2',
      make: {
        makeId: 'bmw',
        name: 'BMW'
      },
      model: '1 Series',
      type: '1.6 30 TDi 85kW',
      imgUrl: 'https://media2.autokopen.nl/afbeeldingen/bmw-1-serie-271020-1024.jpg',
      fuelType: {
        fuelTypeId: 'diesel',
        name: 'Diesel'
      },
      gearbox: {
        gearboxId: 'manual',
        name: 'Manual'
      }
    },
    {
      carId: '3',
      make: {
        makeId: 'mercedes',
        name: 'Mercedes'
      },
      model: 'A Class',
      type: '1.6 30 TDi 85kW',
      imgUrl: 'https://www.topgear.nl/thumbs/hd/2018/02/nieuwe-mercedes-a-klasse-2018-8.jpg',
      fuelType: {
        fuelTypeId: 'petrol',
        name: 'Petrol'
      },
      gearbox: {
        gearboxId: 'automatic',
        name: 'Automatic'
      }
    },
    {
      carId: '4',
      make: {
        makeId: 'volkswagen',
        name: 'Volkswagen'
      },
      model: 'Golf',
      type: '1.6 30 TDi 85kW',
      imgUrl: 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/volkswagen-golf_0.jpg?itok=gf0XwLxI',
      fuelType: {
        fuelTypeId: 'petrol',
        name: 'Petrol'
      },
      gearbox: {
        gearboxId: 'manual',
        name: 'Manual'
      }
    }
  ];

  find(): Observable<Car[]> {
    return of(this.cars);
  }

  findOne(carId: string): Observable<Car> {
    return of(this.cars.find(car => car.carId === carId));
  }
}
