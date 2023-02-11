import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  customTextSuccess: {
    color: "#24D92A",
  },
  customTextError: {
    color: "#DF2E2E",
  },
}));

const PasswordValidation = ({ passValidation }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12}>
      <Typography variant="subtitle1" color="error" align="left">
        Your password need to:
      </Typography>
      <Typography
        className={
          passValidation.lowerAndUpperCase
            ? classes.customTextSuccess
            : classes.customTextError
        }
        variant="subtitle1"
        align="left"
      >
        {passValidation.lowerAndUpperCase ? (
          <span>&#10003;</span>
        ) : (
          <span>&#10005;</span>
        )}{" "}
        Include both upper and lower case characters.
      </Typography>
      <Typography
        className={
          passValidation.atleastOneNumberOrSymbol
            ? classes.customTextSuccess
            : classes.customTextError
        }
        variant="subtitle1"
        align="left"
      >
        {passValidation.atleastOneNumberOrSymbol ? (
          <span>&#10003;</span>
        ) : (
          <span>&#10005;</span>
        )}{" "}
        Include at least one number or symbol.
      </Typography>
      <Typography
        className={
          passValidation.atleastEightCharactersLong
            ? classes.customTextSuccess
            : classes.customTextError
        }
        variant="subtitle1"
        align="left"
      >
        {passValidation.atleastEightCharactersLong ? (
          <span>&#10003;</span>
        ) : (
          <span>&#10005;</span>
        )}{" "}
        Be at least 8 characters long.
      </Typography>
      <Typography
        className={
          passValidation.confirmPassMatched
            ? classes.customTextSuccess
            : classes.customTextError
        }
        variant="subtitle1"
        align="left"
      >
        {passValidation.confirmPassMatched ? (
          <span>&#10003;</span>
        ) : (
          <span>&#10005;</span>
        )}{" "}
        Password & Confirm Password matched.
      </Typography>
    </Grid>
  );
};

export default PasswordValidation;
