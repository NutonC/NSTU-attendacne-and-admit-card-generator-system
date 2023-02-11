import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import UniversityRegistrationForm from "./University-registration-form.component";
import CustomAlert from "../custom-alert/Custom-alert.component";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px",
  },
  paper: {
    padding: "30px",
  },
  text: {
    margin: "20px 0",
  },
}));

function UniversityRegistrationFormView({ selectedPackage }) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <UniversityRegistrationForm selectedPackage={selectedPackage} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomAlert
            message={`Still in BETA test. 
          Use this TEST CREDIT CARD for payment!!. 
          Card Number: 4242 4242 4242 4242 Expiry: 11/22 CVC: 123`}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default UniversityRegistrationFormView;
