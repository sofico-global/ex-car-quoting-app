import { Car } from '../app/types/car.type';
import { Option } from '../app/types/option.type';

export interface ApplicationState {
  options: Option[];
  leasePrice: number;
}
