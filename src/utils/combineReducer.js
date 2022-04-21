export const combineReducers = (state, action) => ({
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
  });
  