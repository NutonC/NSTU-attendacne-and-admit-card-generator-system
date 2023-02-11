import { FormActionTypes } from "./form.types";

export const setCommonFormData = (formData) => ({
  type: FormActionTypes.SET_COMMON_FORM_DATA,
  payload: { ...formData },
});
