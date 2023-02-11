import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectPackages,
  selectPackagesIsPending,
} from "../../redux/package/package.selectors";

import SinglePackage from "./Single-package.component";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Spinner from "../spinner/Spinner.component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    paddingTop: "5vh",
  },
}));

function SubscriptionPackage({ packagesData, isPackageLoading }) {
  const classes = useStyles();

  return isPackageLoading ? (
    <Spinner />
  ) : (
    <Container>
      <Grid container spacing={3} className={classes.root}>
        {packagesData.map((data, i) => (
          <Grid item md={4} sm={4} xs={12} key={i}>
            <SinglePackage {...data} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  isPackageLoading: selectPackagesIsPending,
  packagesData: selectPackages,
});

export default connect(mapStateToProps, null)(SubscriptionPackage);
