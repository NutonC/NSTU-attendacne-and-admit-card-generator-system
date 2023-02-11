import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Link,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import CommonFormFields from "../signup-form/Common-form-fields.component";
import PaymentForm from "../payment-form/Payment-form.component";
import SubscriptionOrderOverview from "../subscription-package/Subscription-order-overview.component";
import AddressForm from "../address-form/Address-form.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCommonformData } from "../../redux/form/form.selectors";

import { httpPostUniversityRegistration } from "../../requests/user.requests";
import { httpPostCreateRegistrationToken } from "../../requests/versity.requests";
import { setAccessToken } from "../../requests/accessToken";
import usePayment from "../../hooks/usePayment.hook";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px",
  },
  paper: {
    padding: "30px",
  },
  text: {
    margin: "20px 0",
  },
}));

function UniversityRegistrationForm({
  selectedPackage,
  commonFormData,
  history,
}) {
  const [universityData, setUniversityData] = useState({
    name: "",
    website: undefined,
  });
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const { packageType } = selectedPackage;
  const classes = useStyles();
  const {
    successMsg,
    errMsg,
    nameOnCard,
    countryData,
    regionData,
    streetData,
    postalCodeData,
    setNameOnCard,
    createSubscription,
    setCountryData,
    setRegionData,
    setStreetData,
    setPostalCodeData,
  } = usePayment();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!commonFormData.passwordValidated) {
      return alert("Please meet all requirements!");
    }

    try {
      setIsPending(true);
      const { customerId, subscriptionId } = await createSubscription({
        name: nameOnCard,
        country: countryData[1],
        region: regionData,
        street: streetData,
        postalCode: postalCodeData,
        email: commonFormData.email,
        priceId: selectedPackage.priceId,
      });

      if (errMsg) {
        throw new Error(errMsg);
      }

      setSuccess(successMsg);

      const response = await httpPostUniversityRegistration({
        name: commonFormData.name,
        email: commonFormData.email,
        phone: commonFormData.phone,
        gender: commonFormData.gender,
        password: commonFormData.password,
        versityName: universityData.name,
        versityWebsite: universityData.website || "undefined",
        packageName: packageType,
        customerId,
        subscriptionId,
      });

      setIsPending(false);

      if (response.error) {
        throw new Error(response.error);
      }

      setErrorMessage("");
      setAccessToken(response.data);
      setSuccess(response.message);

      setIsPending(true);
      const createTokenForManagement = await httpPostCreateRegistrationToken(
        "management"
      );
      setIsPending(false);
      if (createTokenForManagement.error) {
        throw new Error(response.error);
      }

      if (createTokenForManagement.message) {
        setErrorMessage("");
        setSuccess(createTokenForManagement.message);
        localStorage.removeItem("selectedPackage");
        setTimeout(() => history.push("/"), 3000);
      }
    } catch (err) {
      setIsPending(false);
      setSuccess("");
      setErrorMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Typography variant="h6" align="justify" className={classes.text}>
        Subscription Details
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SubscriptionOrderOverview
            packageName={selectedPackage.packageName}
            packageType={selectedPackage.packageType}
            packageDuration={selectedPackage.packageDuration}
            price={selectedPackage.price}
            taxPercentage={selectedPackage.taxPercentage}
            country={selectedPackage.country}
            taxPrice={selectedPackage.taxPrice}
            updatedPrice={selectedPackage.updatedPrice}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" align="justify" className={classes.text}>
        Personal information
      </Typography>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={4}>
          <CommonFormFields />
        </Grid>
      </Paper>

      <Typography variant="h6" align="justify" className={classes.text}>
        University information
      </Typography>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="University Name"
              placeholder="Your University name"
              variant="outlined"
              onChange={(e) =>
                setUniversityData({ ...universityData, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="University Website"
              placeholder="https://university.com"
              variant="outlined"
              onChange={(e) =>
                setUniversityData({
                  ...universityData,
                  website: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" align="justify" className={classes.text}>
        Payment Details
        <Typography variant="body2" align="justify" style={{ color: "gray" }}>
          <LockOutlined fontSize="small" />
          Payment is securely handled and processed by{" "}
          <Link href={"https://stripe.com"}>Stripe.com</Link>. VERSYS does not
          receive, process or store any of your payment information.
        </Typography>
      </Typography>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <PaymentForm setCustomerName={setNameOnCard} />
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" align="justify" className={classes.text}>
        Billing Address
      </Typography>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={4}>
          <AddressForm
            country={countryData}
            setCountry={setCountryData}
            setRegion={setRegionData}
            setStreetAddress={setStreetData}
            setPostalCode={setPostalCodeData}
          />
        </Grid>
      </Paper>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isPending ? true : false}
        className={classes.text}
      >
        {isPending ? (
          <CircularProgress />
        ) : (
          <Typography variant="h6">Register University</Typography>
        )}
      </Button>

      {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
      {success && <Typography variant="body1">{success}</Typography>}
    </form>
  );
}

const mapStateToProps = createStructuredSelector({
  commonFormData: selectCommonformData,
});

export default connect(
  mapStateToProps,
  null
)(withRouter(UniversityRegistrationForm));
