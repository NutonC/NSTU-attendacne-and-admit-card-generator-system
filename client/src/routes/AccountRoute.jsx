import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from "../components/spinner/Spinner.component";
import Signin from "../pages/Signin";
import Account from "../pages/Account";

function AccountRoute({ currentUser, userSessionLoading }) {
  return userSessionLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          currentUser && currentUser.uType ? (
            <Redirect to={"/account/profile"} />
          ) : (
            <Signin />
          )
        }
      />
      <Route
        path="/account"
        render={() => (currentUser ? <Account /> : <Redirect to="/" />)}
      />
    </Switch>
  );
}

export default AccountRoute;
