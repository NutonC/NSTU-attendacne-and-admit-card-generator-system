import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

import Logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    boxShadow: "0 0 28px rgb(0 0 0 / 8%)",
  },
}));

export default function Signin() {
  const classes = useStyles();

  return (
    <Paper
      className={classes.paper}
      style={{ background: "none", boxShadow: "none" }}
    >
      <img
        src={Logo}
        alt={"Logo"}
        style={{ height: "100px", width: "auto", marginLeft: "0" }}
      />

      <Typography
        variant="h5"
        style={{
          fontWeight: "700",
          color: "#202342",
          fontSize: "2rem",
        }}
      >
        A University management Tool
      </Typography>
    </Paper>
  );
}
