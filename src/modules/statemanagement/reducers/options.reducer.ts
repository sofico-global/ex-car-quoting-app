import { Option } from '../../app/types/option.type';
import { OptionsActions } from '../actions';
import { ActionTypes } from '../action-types';

export function optionsReducer(state: Option[] = [], action: OptionsActions): Option[] {
  switch (action.type) {
    case ActionTypes.ADD_OPTION:
      return [...state, {...action.payload.option, isSelected: true}];
    case ActionTypes.REMOVE_OPTION:
      return state.filter(option => option.optionId !== action.payload.optionId);
    case ActionTypes.CLEAR_OPTIONS:
      return [];
    default:
      return state;
  }
}
