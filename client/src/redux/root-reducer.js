import { combineReducers } from "redux";
import { subsPackageReducer } from "./package/package.reducer";
import { userReducer } from "./user/user.reducer";
import { teacherReducer } from "./teacher/teacher.reducer";
import { formReducer } from "./form/form.reducer";
import { managementReducer } from "./management/management.reducer";

const rootReducer = combineReducers({
  form: formReducer,
  subsPackage: subsPackageReducer,
  user: userReducer,
  teacher: teacherReducer,
  management: managementReducer,
});

export default rootReducer;
