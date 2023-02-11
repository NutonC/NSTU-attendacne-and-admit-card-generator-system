import React, { lazy, Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Spinner from "../components/spinner/Spinner.component";

const ProfileView = lazy(() => import("../components/profile/Profile.view"));
const ContainerSemesters = lazy(() =>
  import("../components/student/Container-semesters.component")
);

function StudentAccountRoutes({ match }) {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path={`${match.path}/profile`} component={ProfileView} />
        <Route
          exact
          path={`${match.path}/my-classes`}
          component={ContainerSemesters}
        />
      </Switch>
    </Suspense>
  );
}

export default withRouter(StudentAccountRoutes);
