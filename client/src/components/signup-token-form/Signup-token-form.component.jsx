import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  makeStyles,
  Container,
  Tooltip,
  Box,
} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchRegistrationTokenStart } from "../../redux/user/user.actions";
import {
  selectUserRegistrationPending,
  selectUserRegistrationError,
} from "../../redux/user/user.selectors";

import Brand from "../brand/Brand.component";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    padding: 0,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  paper: {
    padding: "5%",
    width: 300,
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  customTooltip: {
    width: "200px",
    fontSize: "1rem",
  },
}));

const SignUpTokenForm = ({
  tokenPending,
  error,
  onRegTokenSubmit,
  history,
}) => {
  const classes = useStyles();

  const [token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegTokenSubmit(token);
  };

  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6} md={6}>
          <Brand />
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <Paper className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Box className={classes.header}>
                <Typography variant="h5">Register with Token</Typography>
                <Tooltip
                  title={`Tokens are provided by University.
                    A 4 digit value. Ex. a2b3
                  `}
                  arrow
                  placement="bottom"
                  classes={{ tooltip: classes.customTooltip }}
                >
                  <HelpIcon fontSize="small" color="action" />
                </Tooltip>
              </Box>
              <TextField
                required
                variant="outlined"
                fullWidth
                label="Token"
                placeholder="Enter your token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ textTransform: "none", width: "100%" }}
                disabled={tokenPending ? true : false}
              >
                {tokenPending ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="h6">Submit</Typography>
                )}
              </Button>
            </form>
            <Grid item align="center">
              <Button onClick={() => history.push("/")}>
                Already have an account? Signin
              </Button>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "10px" }}
            >
              {error ? (
                <Typography variant="body1" className={classes.error}>
                  &#9940; {error}
                </Typography>
              ) : null}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  tokenPending: selectUserRegistrationPending,
  error: selectUserRegistrationError,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onRegTokenSubmit: (tokenCode) =>
      dispatch(fetchRegistrationTokenStart(tokenCode)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUpTokenForm));
