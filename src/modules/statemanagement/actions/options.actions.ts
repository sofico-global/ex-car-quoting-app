import { Option } from '../../app/types/option.type';
import { ActionTypes } from '../action-types';

export class ClearOptionsAction {
  type = ActionTypes.CLEAR_OPTIONS;
}

export class AddOptionAction {
  type = ActionTypes.ADD_OPTION;
  payload: { option: Option };

  constructor(option: Option) {
    this.payload = {option};
  }
}

export class RemoveOptionAction {
  type = ActionTypes.REMOVE_OPTION;
  payload: { optionId: string };

  constructor(optionId: string) {
    this.payload = {optionId};
  }
}

export type OptionsActions =
  | ClearOptionsAction
  | AddOptionAction
  | RemoveOptionAction;
