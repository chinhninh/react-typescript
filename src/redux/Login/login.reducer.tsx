import { LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS } from "./login.types";

const INITIAL_STATE = {
  loading: false,
  token: null,
  error: null,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action?.payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        token: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
