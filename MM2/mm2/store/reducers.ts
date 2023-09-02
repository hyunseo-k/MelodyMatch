// reducers.ts
import { Action, State } from './types';

const initialState: State = {
  userInfo: null,
};

const rootReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
