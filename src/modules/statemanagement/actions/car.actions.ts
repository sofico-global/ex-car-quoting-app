import { Car } from '../../app/types/car.type';

export class SetCarAction {
  type = 'SET_CAR';
  payload: { car: Car };

  constructor(car: Car) {
    this.payload = {car};
  }
}

export class ClearCarAction {
  type = 'CLEAR_CAR';
}

export type CarOptions = SetCarAction | ClearCarAction;
