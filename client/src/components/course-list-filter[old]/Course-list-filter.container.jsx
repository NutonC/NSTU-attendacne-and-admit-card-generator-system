import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectTeacherIsPending } from "../../redux/teacher/teacher.selectors";
import WithSpinner from "../with-spinner/With-spinner.component";
import CourseListFilter from "./Course-list-filter.component";

//here we need to name 'isLoading' exact same as our component 'WithSpinner' expects
const mapStateToProps = createStructuredSelector({
  isLoading: selectTeacherIsPending,
});

//const CourseListFilterContainer = connect(mapStateToProps)(WithSpinner(TeacherProfileView));
//above line is equivalent to writing in 'compose' pattern of functional programming
//compose reads from right to left
const CourseListFilterContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CourseListFilter);

export default CourseListFilterContainer;
