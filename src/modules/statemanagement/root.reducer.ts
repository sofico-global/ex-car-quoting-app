import { optionsReducer } from './reducers/options.reducer';
import { leasePriceReducer } from './reducers/lease-price.reducer';

export const rootReducer = {
  options: optionsReducer,
  leasePrice: leasePriceReducer
};
