import React from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";

import CountryRegionSelector from "./Country-region-selector.component";

const useStyles = makeStyles({
  input: {
    "&:invalid": {
      color: "red",
    },
  },
});

const AddressForm = ({
  country,
  setCountry,
  setRegion,
  setStreetAddress,
  setPostalCode,
}) => {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <CountryRegionSelector
        country={country}
        setCountry={setCountry}
        setRegion={setRegion}
      />
      <Grid item xs={12}>
        <TextField
          label="Street Address"
          name="street"
          variant="outlined"
          placeholder="Street"
          required
          fullWidth
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Postal Code"
          name="postalcode"
          variant="outlined"
          placeholder="Code"
          required
          fullWidth
          inputProps={{
            shrink: true,
            className: classes.input,
            pattern: "[a-z0-9]{4,5}",
          }}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default AddressForm;
