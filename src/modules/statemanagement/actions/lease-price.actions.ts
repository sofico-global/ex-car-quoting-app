import { ActionTypes } from '../action-types';

export class SetLeasePriceAction {
  type = ActionTypes.SET_LEASE_PRICE;
  payload: { leasePrice: number; };

  constructor(leasePrice: number) {
    this.payload = {leasePrice};
  }
}

export type LeasePriceActions = SetLeasePriceAction;
