import React from "react";
import { Container, Paper, Grid, makeStyles } from "@material-ui/core";

import Brand from "../components/brand/Brand.component";
import SignInForm from "../components/signin-form/Signin-form.component";
import Navbar from "../components/navbar/Navbar.component";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    boxShadow: "0 0 28px rgb(0 0 0 / 8%)",
  },
  container: {
    display: "flex",
    height: "80vh",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default function Signin() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container className={classes.container}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Brand />
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={classes.paper}>
              <SignInForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
