import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Signup from "../pages/Signup";
import Team from "../pages/Team";
import RegisterUniversity from "../pages/RegisterUniversity";
import GetStarted from "../pages/GetStarted";
import ErrorBoundary from "../components/error-boundary/Error-boundary.component";
import Spinner from "../components/spinner/Spinner.component";
import PaymentForm from "../components/payment-form/Payment-form.component";

const AccountRoute = lazy(() => import("./AccountRoute"));

function Routes({ currentUser, userSessionLoading }) {
  return (
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary>
        <AccountRoute
          currentUser={currentUser}
          userSessionLoading={userSessionLoading}
        />
      </ErrorBoundary>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/get-started" component={GetStarted} />
        <Route path="/team" component={Team} />
        <Route path="/register-university" component={RegisterUniversity} />
        <Route path="/payment" component={PaymentForm} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
