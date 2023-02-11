import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Grid, Typography } from "@material-ui/core";

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

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ borderRadius: "10px" }}>
            <Typography
              variant="body1"
              style={{ color: "#202342", fontSize: "1rem", fontWeight: "500" }}
            >
              Made with 🖤 by versys Team
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
