import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { MailOutline, Fingerprint } from "@material-ui/icons";

import { connect } from "react-redux";
import { signInStart } from "../../redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import {
  selectUserIsPending,
  selectUserError,
} from "../../redux/user/user.selectors";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  paper: {
    padding: "30px",
    backgroundColor: "ecf0f4",
    borderRadius: "8px",
  },
  error: {
    color: "red",
  },
}));

const SigninForm = ({
  onSubmitSignin,
  userIsPending,
  errorLoading,
  history,
}) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitSignin(email, password);
    clearForm();
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <Paper className={classes.paper} style={{ boxShadow: "none" }}>
      <h1 style={{ textAlign: "center" }}>SIGN IN</h1>
      <form className={classes.margin} onSubmit={handleSubmit}>
        <Grid container spacing={4} alignItems="flex-end">
          <Grid item>
            <MailOutline />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              fullWidth
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              fullWidth
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Grid item>
            <Button
              disableFocusRipple
              disableRipple
              style={{ textTransform: "none" }}
              variant="text"
              color="primary"
            >
              Forgot password ?
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ textTransform: "none", width: "100%" }}
            disabled={userIsPending ? true : false}
          >
            {userIsPending ? (
              <CircularProgress />
            ) : (
              <Typography variant="h6">Sign In</Typography>
            )}
          </Button>
        </Grid>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item>
            <Button
              disableFocusRipple
              disableRipple
              style={{ textTransform: "none" }}
              variant="text"
              color="primary"
              onClick={() => history.push("/signup")}
            >
              Dont't have an account? Register with your university!
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
          {errorLoading ? (
            <Typography variant="body1" className={classes.error}>
              &#9940; {errorLoading}
            </Typography>
          ) : null}
        </Grid>
      </form>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  userIsPending: selectUserIsPending,
  errorLoading: selectUserError,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitSignin: (identity, email, password) =>
      dispatch(signInStart(identity, email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SigninForm));
