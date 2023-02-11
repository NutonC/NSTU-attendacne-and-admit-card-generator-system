import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  makeStyles,
  Box,
  TextField,
  Grid,
  Tooltip,
} from "@material-ui/core";
import { Help } from "@material-ui/icons";

const useStyles = makeStyles({
  packageDataContainer: {
    borderRadius: "4px",
  },
  card: {
    padding: "30px",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
  },
  cuoponForm: {
    padding: "10px 0px",
  },
  couponToggle: {
    margin: "10px 0px",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
  },
  customTooltip: {
    width: "200px",
    fontSize: "1rem",
  },
});

function SubscriptionOrderOverview(props) {
  const [showForm, setShowForm] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Coupon Expired ${couponCode} 😥`);
  };

  return (
    <Card className={classes.packageDataContainer}>
      <CardContent className={classes.card}>
        <Typography align="justify" style={{ textTransform: "capitalize" }}>
          VERSYS {props.packageName} Access
        </Typography>
        <Typography align="justify" style={{ fontWeight: "bold" }}>
          ${props.price} / {props.packageName.toLowerCase()}
        </Typography>
        {!showForm && (
          <Typography
            align="justify"
            className={classes.couponToggle}
            onClick={() => setShowForm(true)}
          >
            Click here to add coupon code
          </Typography>
        )}
        {showForm && (
          <form className={classes.cuoponForm} onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  label="Coupon Code"
                  placeholder="Enter Coupon Code"
                  variant="outlined"
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button type="submit">Apply</Button>
              </Grid>
            </Grid>
          </form>
        )}
        <Box className={classes.box}>
          <Typography>Package Name</Typography>
          <Typography>{props.packageName.toUpperCase()}</Typography>
        </Box>
        <Box className={classes.box}>
          <Box className={classes.box}>
            <Typography>{`Est. Tax ${
              props.taxPercentage === undefined ? "+" : props.taxPercentage
            }% ${props.country}`}</Typography>
            &nbsp;
            <Tooltip
              title={`The estimated sales tax will be added to the order summary after you provide a delivery address. 
              The listed sales tax on checkout is only an estimate. Your invoice will contain the final sales tax.`}
              arrow
              placement="bottom"
              classes={{ tooltip: classes.customTooltip }}
            >
              <Help fontSize="small" color="action" />
            </Tooltip>
          </Box>
          <Typography>
            +$ {props.taxPrice > 0 ? props.taxPrice : null}
          </Typography>
        </Box>
        <hr />
        <Box className={classes.box}>
          <Typography style={{ fontWeight: "bold" }}>
            {"Billed Today(USD)"}
          </Typography>
          <Typography style={{ fontWeight: "bold" }}>
            ${props.updatedPrice}
            {props.taxPercentage === undefined && `(including tax)`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SubscriptionOrderOverview;
