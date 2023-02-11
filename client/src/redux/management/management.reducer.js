import { ManagementActionTypes } from "./management.types";

const INITIAL_STATE = {
  managementTokenData: [],
  isPending: false,
  error: null,
};

export const managementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ManagementActionTypes.SET_MANAGEMENT_TOKENS:
      return {
        ...state,
        isPending: false,
        error: null,
        managementTokenData: [action.payload].concat(state.managementTokenData),
      };
    default:
      return state;
  }
};
