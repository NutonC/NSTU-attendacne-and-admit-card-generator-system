import { CountryRegionData } from "react-country-region-selector";
import { TextField, Grid, MenuItem } from "@material-ui/core";

const getRegions = (country) => {
  if (!country) {
    return [];
  }
  return country[2].split("|").map((regionPair) => {
    let [regionName] = regionPair.split("~");
    return regionName;
  });
};

function CountryRegionSelector({ country, setCountry, setRegion }) {
  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          fullWidth
          required
          select
          onChange={(e) => setCountry(e.target.value)}
        >
          {CountryRegionData.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option[0]}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="region"
          label="City"
          variant="outlined"
          fullWidth
          required
          select
          disabled={!country || country === ""}
          onChange={(e) => setRegion(e.target.value)}
        >
          {getRegions(country).map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
}

export default CountryRegionSelector;
