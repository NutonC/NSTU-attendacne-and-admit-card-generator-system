import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  registrationTokenData: null,
  registrationPending: false,
  registrationError: null,
  currentUser: null,
  isPending: false,
  checkSessionPending: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        checkSessionPending: true,
      };
    case UserActionTypes.SIGN_IN_START:
    case UserActionTypes.SIGN_OUT_START:
      return {
        ...state,
        isPending: true,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isPending: false,
        checkSessionPending: false,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isPending: false,
        checkSessionPending: false,
      };
    case UserActionTypes.FETCH_REG_TOKEN_START:
      return {
        ...state,
        registrationPending: true,
      };
    case UserActionTypes.FETCH_REG_TOKEN_SUCCESS:
      return {
        ...state,
        registrationPending: false,
        registrationTokenData: action.payload,
        registrationError: null,
      };
    case UserActionTypes.FETCH_REG_TOKEN_FAILURE:
      return {
        ...state,
        registrationPending: false,
        registrationError: action.payload,
      };
    default:
      return state;
  }
};
