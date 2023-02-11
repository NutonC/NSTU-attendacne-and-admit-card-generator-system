import { createSelector } from "reselect";

const selectPackage = (state) => state.subsPackage;

export const selectPackagesIsPending = createSelector(
  [selectPackage],
  (subsPackage) => subsPackage.packageIsPending
);

export const selectPackages = createSelector(
  [selectPackage],
  (subsPackage) => subsPackage.packages
);

export const selectPackagesError = createSelector(
  [selectPackage],
  (subsPackage) => subsPackage.error
);

export const selectSelectedPackage = createSelector(
  [selectPackage],
  (subsPackage) => subsPackage.selectedPackage
);
