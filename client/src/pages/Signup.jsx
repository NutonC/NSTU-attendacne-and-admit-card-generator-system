import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserRegistrationTokenData } from "../redux/user/user.selectors";

import Navbar from "../components/navbar/Navbar.component";
import SignUpTokenForm from "../components/signup-token-form/Signup-token-form.component";
import SignupForm from "../components/signup-form/Signup-form.component";

function Signup({ tokenData, match }) {
  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path={`${match.path}/`}
          render={() =>
            tokenData?.tokenType ? (
              <Redirect to={`${match.path}/form`} />
            ) : (
              <SignUpTokenForm />
            )
          }
        />
        <Route
          exact
          path={`${match.path}/form`}
          render={() =>
            tokenData?.tokenType ? (
              <SignupForm />
            ) : (
              <Redirect to={`${match.path}/`} />
            )
          }
        />
      </Switch>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  tokenData: selectUserRegistrationTokenData,
});

export default connect(mapStateToProps, null)(Signup);
