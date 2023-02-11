import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSelectedPackage } from "../redux/package/package.selectors";

import Navbar from "../components/navbar/Navbar.component";
import SubscriptionPackage from "../components/subscription-package/Subscription-package.component";
import UniversityRegistrationFormView from "../components/university-registration-form/University-registration-form.view";

function RegisterUniversity({ match, selectedPackage }) {
  const getPackageFromLocalStorage = localStorage.getItem("selectedPackage");
  const parsedSelectedPackage = JSON.parse(getPackageFromLocalStorage);
  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path={`${match.path}/`}
          render={() => {
            return selectedPackage ? (
              <Redirect to={`${match.path}/form`} />
            ) : (
              <SubscriptionPackage />
            );
          }}
        />
        <Route
          exact
          path={`${match.path}/form`}
          render={() => {
            return parsedSelectedPackage ? (
              <UniversityRegistrationFormView
                selectedPackage={parsedSelectedPackage}
              />
            ) : (
              <Redirect to={`${match.path}/`} />
            );
          }}
        />
      </Switch>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  selectedPackage: selectSelectedPackage,
});

export default connect(mapStateToProps, null)(RegisterUniversity);
