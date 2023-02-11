import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectUserIsPending = createSelector(
  [selectUser],
  (user) => user.isPending
);

export const selectUsercheckSessionPending = createSelector(
  [selectUser],
  (user) => user.checkSessionPending
);

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUserError = createSelector(
  [selectUser],
  (user) => user.error
);

export const selectUserRegistrationPending = createSelector(
  [selectUser],
  (user) => user.registrationPending
);

export const selectUserRegistrationTokenData = createSelector(
  [selectUser],
  (user) => user.registrationTokenData
);

export const selectUserRegistrationError = createSelector(
  [selectUser],
  (user) => user.registrationError
);
