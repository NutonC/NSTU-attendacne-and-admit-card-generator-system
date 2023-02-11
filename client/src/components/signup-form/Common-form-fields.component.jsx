import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
} from "@material-ui/core";

import { connect } from "react-redux";
import { setCommonFormData } from "../../redux/form/form.actions";

import PasswordValidation from "./Password-validation.component";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  radioStyle: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #C4C4C4",
    borderRadius: "5px",
  },
  genderCaption: {
    marginTop: "12px",
    marginRight: "30px",
    paddingLeft: "15px",
  },
}));

function CommonFormFields({ onChangeSetCommonFormData, formTitle }) {
  const classes = useStyles();
  const [passValues, setPassValues] = useState({
    pass: "",
    confirmPass: undefined,
  });
  const [passValidation, setPassValidation] = useState({
    lowerAndUpperCase: false,
    atleastOneNumberOrSymbol: false,
    atleastEightCharactersLong: false,
    confirmPassMatched: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    const handlePasswordValidation = (pass, confirmPass) => {
      const smallAndUppercase = /(?=.*[a-z])(?=.*[A-Z])/g;
      const atLeastOneNumberOrSymbol = /(?=.*[0-9])|(?=.*[!@#$%^&*])/g;
      const beAtleastEightCharacterLong = /.{8}/g;
      const result = {
        smallAndUpper: smallAndUppercase.test(pass),
        oneNumberOrSymbol: atLeastOneNumberOrSymbol.test(pass),
        atleastEightCharacter: beAtleastEightCharacterLong.test(pass),
        confirmPassMatched: pass === confirmPass,
      };
      return result;
    };

    const passValidationResult = handlePasswordValidation(
      passValues.pass,
      passValues.confirmPass
    );

    setPassValidation((passValidation) => ({
      ...passValidation,
      lowerAndUpperCase: passValidationResult.smallAndUpper,
      atleastOneNumberOrSymbol: passValidationResult.oneNumberOrSymbol,
      atleastEightCharactersLong: passValidationResult.atleastEightCharacter,
      confirmPassMatched: passValidationResult.confirmPassMatched,
    }));
  }, [passValues.pass, passValues.confirmPass]);

  useEffect(() => {
    onChangeSetCommonFormData({
      ...formData,
      password: passValues.confirmPass,
      passwordValidated: passValidation.confirmPassMatched,
    });
  }, [
    onChangeSetCommonFormData,
    formData,
    passValues.confirmPass,
    passValidation.confirmPassMatched,
  ]);

  const handlePassChange = (prop) => (event) => {
    setPassValues({
      ...passValues,
      [prop]: event.target.value,
    });
  };

  return (
    <>
      <Grid item xs={12} className={classes.root}>
        <TextField
          required
          fullWidth
          label="Name"
          placeholder="Enter your name"
          variant="outlined"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} className={classes.root}>
        <TextField
          required
          fullWidth
          label="Email"
          placeholder="Enter your email"
          variant="outlined"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.root}>
        <TextField
          required
          fullWidth
          variant="outlined"
          type="password"
          label="Password"
          placeholder="Enter your password"
          onChange={handlePassChange("pass")}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.root}>
        <TextField
          required
          fullWidth
          variant="outlined"
          type="password"
          label="Confirm Password"
          placeholder="Enter your confirm password"
          onChange={handlePassChange("confirmPass")}
          disabled={passValues.pass.length <= 0}
        />
      </Grid>
      {passValues.pass.length > 0 && (
        <PasswordValidation passValidation={passValidation} />
      )}
      <Grid item xs={12} className={classes.root}>
        <TextField
          required
          fullWidth
          variant="outlined"
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} className={classes.root}>
        <FormControl component="fieldset" className={classes.radioStyle}>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            className={classes.genderCaption}
          >
            Gender
          </FormLabel>

          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            style={{ display: "initial" }}
          >
            <FormControlLabel
              value="female"
              control={<Radio required />}
              label="Female"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <FormControlLabel
              value="male"
              control={<Radio required />}
              label="Male"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSetCommonFormData: (formData) =>
      dispatch(setCommonFormData(formData)),
  };
};

export default connect(null, mapDispatchToProps)(CommonFormFields);
