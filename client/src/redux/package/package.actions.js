import { PackageActionTypes } from "./package.types";

export const setPackagesStart = () => ({
  type: PackageActionTypes.SET_PACKAGES_START,
});

export const setPackagesSucess = (packagesData) => ({
  type: PackageActionTypes.SET_PACKAGES_SUCCESS,
  payload: packagesData,
});

export const setPackagesFailure = (error) => ({
  type: PackageActionTypes.SET_PACKAGES_FAILURE,
  payload: error,
});

export const setSelectedPackage = (packageData) => ({
  type: PackageActionTypes.SET_SELECTED_PACKAGE,
  payload: packageData,
});
