import React from "react";
import { Grid, Container, Typography, makeStyles } from "@material-ui/core";

import Navbar from "../components/navbar/Navbar.component";
import DirectionsPicture from "../assets/howto.png";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2.8vh 0",
  },
}));

export default function GetStarted() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container>
        <Grid
          container
          spacing={4}
          className={classes.root}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={5}>
            <Typography variant="h2">GET STARTED IN 3 EASY STEPS</Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <img
              src={DirectionsPicture}
              alt="GetStarted"
              width={"100%"}
              height={"100%"}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
