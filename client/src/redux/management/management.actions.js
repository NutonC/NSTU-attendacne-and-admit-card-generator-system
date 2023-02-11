import { ManagementActionTypes } from "./management.types";

export const fetchManagementStart = () => ({
  type: ManagementActionTypes.FETCH_MANAGEMENT_START,
});

export const fetchManagementSuccess = (managementData) => ({
  type: ManagementActionTypes.FETCH_COURSES_SUCCESS,
  payload: managementData,
});

export const fetchManagementFailure = (error) => ({
  type: ManagementActionTypes.FETCH_COURSES_FAILURE,
  payload: error,
});

export const setManagementTokens = (managementData) => ({
  type: ManagementActionTypes.SET_MANAGEMENT_TOKENS,
  payload: managementData,
});
