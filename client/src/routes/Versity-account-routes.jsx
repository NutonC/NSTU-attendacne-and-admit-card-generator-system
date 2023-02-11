import React, { lazy, Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Spinner from "../components/spinner/Spinner.component";

const ProfileView = lazy(() => import("../components/profile/Profile.view"));
const VersityDashboard = lazy(() =>
  import("../components/versity/Versity-manage.component")
);
const VersityPaymentView = lazy(() =>
  import("../components/versity/Versity-payment.view")
);

function VersityAccountRoutes({ match }) {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path={`${match.path}/profile`} component={ProfileView} />
        <Route
          exact
          path={`${match.path}/manage`}
          component={VersityDashboard}
        />
        <Route
          exact
          path={`${match.path}/payment`}
          component={VersityPaymentView}
        />
      </Switch>
    </Suspense>
  );
}

export default withRouter(VersityAccountRoutes);
