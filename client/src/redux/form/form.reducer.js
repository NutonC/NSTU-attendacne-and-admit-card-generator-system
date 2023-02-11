import { FormActionTypes } from "./form.types";

const INITIAL_STATE = {
  commonFormData: null,
};

export const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormActionTypes.SET_COMMON_FORM_DATA:
      return {
        ...state,
        commonFormData: action.payload,
      };
    default:
      return state;
  }
};
