import React, { lazy, Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Spinner from "../components/spinner/Spinner.component";

const ProfileView = lazy(() => import("../components/profile/Profile.view"));
const EnrollCourse = lazy(() =>
  import("../components/teacher/Enroll-course.component")
);
const ContainerAttendance = lazy(() =>
  import("../components/teacher/Container-attendance.component")
);

function TeacherAccountRoutes({ match }) {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path={`${match.path}/profile`} component={ProfileView} />
        <Route exact path={`${match.path}/classes`} component={EnrollCourse} />
        <Route
          exact
          path={`${match.path}/classes/:students`}
          component={ContainerAttendance}
        />
      </Switch>
    </Suspense>
  );
}

export default withRouter(TeacherAccountRoutes);
