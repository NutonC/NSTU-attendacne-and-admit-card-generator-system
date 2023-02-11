import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Grid, Typography } from "@material-ui/core";

import Logo from "../../assets/logo-2.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    textAlign: "center",
    boxShadow: "0 0 28px rgb(0 0 0 / 8%)",
  },
}));

export default function Titlebar() {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ borderRadius: "10px" }}>
            <img src={Logo} alt="" style={{ height: "80px", width: "auto" }} />
            <Typography
              variant="h4"
              style={{
                color: "#202342",
                fontWeight: "700",
                fontSize: "1.75rem",
              }}
            >
              A University Management Tool
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
