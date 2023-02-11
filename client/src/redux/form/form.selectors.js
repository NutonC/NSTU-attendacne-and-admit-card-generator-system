import { createSelector } from "reselect";

const selectForm = (state) => state.form;

export const selectCommonformData = createSelector(
  [selectForm],
  (form) => form.commonFormData
);
