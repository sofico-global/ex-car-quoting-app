import { ActionTypes } from '../action-types';
import { LeasePriceActions } from '../actions';

export function leasePriceReducer(state: number = null, action: LeasePriceActions): number {
  switch (action.type) {
    case ActionTypes.SET_LEASE_PRICE:
      return action.payload.leasePrice;
    default:
      return state;
  }
}
