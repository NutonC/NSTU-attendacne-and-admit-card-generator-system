import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

import { connect } from "react-redux";
import { setSelectedPackage } from "../../redux/package/package.actions";
import usePayment from "../../hooks/usePayment.hook";

const useStyles = makeStyles({
  packageDataContainer: {
    borderRadius: "20px",
  },
  card: {
    borderRadius: "20px",
    padding: "0px",
    border: "2px solid",
    borderColor: (props) => (props.highlighted ? "#F51767" : "#ffffff"),
  },
  button: {
    margin: "20px",
    borderRadius: "40px",
    width: "80%",
    padding: "10px 0px",
    border: "2px solid #F51767",
    color: (props) => (props.highlighted ? "#fff" : "#000"),
    backgroundColor: (props) => (props.highlighted ? "#F51767" : "#ffffff"),
    "&:hover": {
      backgroundColor: (props) => (props.highlighted ? "#ffffff" : "#F51767"),
      color: (props) => (props.highlighted ? "#000" : "#fff"),
    },
  },
});

function SinglePackage(props) {
  const { setPackage } = props;
  const [loading, setLoading] = useState(false);
  const classes = useStyles(props);

  const { setupSubscription } = usePayment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { country, taxPercentage, taxDisplayName } =
        await setupSubscription();

      const salesTaxRate = Number(taxPercentage / 100) || 0;
      const taxPrice = Number(props.price) * salesTaxRate;
      const updatedPrice = Number(props.price) + taxPrice;
      setLoading(false);

      localStorage.setItem(
        "selectedPackage",
        JSON.stringify({
          packageName: props.packageName,
          packageType: props.packageType,
          packageDuration: props.packageDurationInDays,
          price: props.price,
          priceId: props.priceId,
          country,
          taxPercentage,
          taxPrice,
          updatedPrice,
          taxDisplayName,
        })
      );

      setPackage({
        packageName: props.packageName,
        packageType: props.packageType,
        packageDuration: props.packageDurationInDays,
        price: props.price,
        priceId: props.priceId,
        country,
        taxPercentage,
        taxPrice,
        updatedPrice,
        taxDisplayName,
      });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className={classes.packageDataContainer}>
        <CardContent className={classes.card}>
          {props.highlighted ? (
            <Typography
              style={{
                backgroundColor: "#F51767",
                padding: "10px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Save 25% compared to monthly
            </Typography>
          ) : null}
          <Typography variant="h6" style={{ padding: "10px 0px 10px" }}>
            {props.packageName}
          </Typography>
          <Typography variant="h5" style={{ padding: "0px 10px 10px" }}>
            ${props.price} / {props.packageName.toLowerCase()}
          </Typography>
          <Typography variant="subtitle2" style={{ padding: "10px" }}>
            {props.description}
          </Typography>

          <Button className={classes.button} variant="contained" type="submit">
            {loading ? (
              <CircularProgress />
            ) : (
              <Typography style={{ fontWeight: "bold" }} variant="button">
                Register Now
              </Typography>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPackage: (packageData) => dispatch(setSelectedPackage(packageData)),
  };
};

export default connect(null, mapDispatchToProps)(SinglePackage);
