import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserRegistrationTokenData } from "../../redux/user/user.selectors";
import { selectCommonformData } from "../../redux/form/form.selectors";

import CommonFormFields from "./Common-form-fields.component";
import { httpPostRegisterWithToken } from "../../requests/user.requests";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "30px",
    marginTop: "30px",
  },
}));

function SignupForm({
  tokenData: {
    tokenType,
    versityName,
    tokenCode,
    departmentName,
    departmentCode,
    session,
    semesterNumber,
  },
  commonFormData,
  history,
}) {
  const classes = useStyles();

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    fathersName: "",
    mothersName: "",
    birthDate: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!commonFormData.passwordValidated) {
      return alert("Please meet all requirements!");
    }

    try {
      let response;
      setIsPending(true);
      if (tokenType === "teacher") {
        response = await httpPostRegisterWithToken(tokenType, {
          name: commonFormData.name,
          email: commonFormData.email,
          phone: commonFormData.phone,
          gender: commonFormData.gender,
          password: commonFormData.password,
          tokenCode: tokenCode,
        });
      } else {
        response = await httpPostRegisterWithToken(tokenType, {
          name: commonFormData.name,
          email: commonFormData.email,
          phone: commonFormData.phone,
          gender: commonFormData.gender,
          password: commonFormData.password,
          fathersName: formData.fathersName,
          mothersName: formData.mothersName,
          dateOfBirth: formData.birthDate,
          tokenCode: tokenCode,
        });
      }

      setIsPending(false);

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.message) {
        setErrorMessage("");
        setSuccess(response.message);
        setTimeout(() => history.push("/"), 3000);
      }
    } catch (err) {
      setSuccess("");
      setErrorMessage(err.message);
    }
  };

  return (
    <Container>
      <form onSubmit={handleOnSubmit}>
        <Paper className={classes.paper} elevation={3}>
          <Grid container spacing={4}>
            {tokenType && (
              <Grid item>
                <Typography variant="h4">
                  Register{" "}
                  {tokenType.charAt(0).toUpperCase() + tokenType.slice(1)}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Tooltip
                title="Unrecognised? try reloading the page!"
                placement="top-start"
                arrow
              >
                <TextField
                  variant="outlined"
                  id="outlined-disabled-u"
                  label="University Name"
                  defaultValue={versityName}
                  placeholder={versityName}
                  fullWidth
                  disabled
                />
              </Tooltip>
            </Grid>
            {tokenType === "teacher" || tokenType === "student" ? (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="outlined-disabled"
                  label="Your department"
                  defaultValue={`${departmentName} - ${departmentCode.toUpperCase()}`}
                  placeholder={`${departmentName} - ${departmentCode.toUpperCase()}`}
                  fullWidth
                  disabled
                />
              </Grid>
            ) : null}
            <CommonFormFields />

            {tokenType && tokenType === "student" && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    label="Fathers Name"
                    placeholder="Enter your father name"
                    onChange={(e) =>
                      setFormData({ ...formData, fathersName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    variant="outlined"
                    label="Mothers Name"
                    placeholder="Enter your mother name"
                    onChange={(e) =>
                      setFormData({ ...formData, mothersName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled
                    label="Session"
                    defaultValue={session}
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Semester"
                    defaultValue={semesterNumber}
                    variant="outlined"
                    fullWidth
                    disabled
                    required
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="h6" align="center">
                    Date of Birth
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="date"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isPending ? true : false}
              >
                {isPending ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="h6">Register</Typography>
                )}
              </Button>
            </Grid>
            {errorMessage && (
              <Typography variant="body1">{errorMessage}</Typography>
            )}
            {success && <Typography variant="body1">{success}</Typography>}
          </Grid>
        </Paper>
      </form>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  tokenData: selectUserRegistrationTokenData,
  commonFormData: selectCommonformData,
});

export default connect(mapStateToProps, null)(withRouter(SignupForm));
