import React, { lazy, Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Spinner from "../components/spinner/Spinner.component";

const ProfileView = lazy(() => import("../components/profile/Profile.view"));
const ManageUniversity = lazy(() =>
  import("../components/management/ManageUniversity.view")
);
const ManagementGenerateToken = lazy(() =>
  import("../components/management/Management-generate-token.view")
);
const Dashboard = lazy(() =>
  import("../components/Dashboard/Dashboard.component")
);

function ManagementAccountRoutes({ match }) {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path={`${match.path}/profile`} component={ProfileView} />
        <Route
          exact
          path={`${match.path}/manage-university`}
          component={ManageUniversity}
        />
        <Route
          exact
          path={`${match.path}/generate-token`}
          component={ManagementGenerateToken}
        />
        <Route exact path={`${match.path}/dashboard`} component={Dashboard} />
      </Switch>
    </Suspense>
  );
}

export default withRouter(ManagementAccountRoutes);
