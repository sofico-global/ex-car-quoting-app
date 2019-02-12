import { carReducer } from './reducers/car.reducer';
import { optionsReducer } from './reducers/options.reducer';

export const rootReducer = {
  car: carReducer,
  options: optionsReducer
};
