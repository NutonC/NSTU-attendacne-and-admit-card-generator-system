import { PackageActionTypes } from "./package.types";

const INITIAL_STATE = {
  packageIsPending: false,
  packages: [],
  selectedPackage: null,
  error: null,
};

export const subsPackageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PackageActionTypes.SET_PACKAGES_START:
      return {
        ...state,
        packageIsPending: true,
      };
    case PackageActionTypes.SET_PACKAGES_SUCCESS:
      return {
        ...state,
        packageIsPending: false,
        error: null,
        packages: action.payload,
      };
    case PackageActionTypes.SET_PACKAGES_FAILURE:
      return {
        ...state,
        packageIsPending: false,
        error: action.payload,
      };
    case PackageActionTypes.SET_SELECTED_PACKAGE:
      return {
        ...state,
        selectedPackage: action.payload,
      };
    default:
      return state;
  }
};
