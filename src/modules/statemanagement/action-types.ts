const typeCache: { [label: string]: boolean } = {};

/* ignore coverage */
function type<T>(label: T | ''): T {
  // this actually checks whether your action type
  // name is unique!
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

/* ignore coverage */
export const ActionTypes = {
  ADD_OPTION: type<'ADD_OPTION'>('ADD_OPTION'),
  REMOVE_OPTION: type<'REMOVE_OPTION'>('REMOVE_OPTION'),
  CLEAR_OPTIONS: type<'CLEAR_OPTIONS'>('CLEAR_OPTIONS')
};
