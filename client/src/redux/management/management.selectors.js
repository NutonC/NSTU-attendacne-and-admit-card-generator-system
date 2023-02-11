import { createSelector } from "reselect";

const selectManagement = (state) => state.management;

export const selectManagementTokenData = createSelector(
  [selectManagement],
  (management) => management.managementTokenData
);
