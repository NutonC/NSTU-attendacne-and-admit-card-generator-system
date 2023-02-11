import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import StripeInput from "./Stripe-input.component";
import { Grid, Tooltip, TextField } from "@material-ui/core";
import CVCtooltip from "../../assets/cvc-tooltip.png";

const PaymentForm = ({ setCustomerName }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TextField
          label="Name on Card"
          name="ccnamer"
          variant="outlined"
          placeholder="Your name on Credit card"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Credit Card Number"
          name="ccnumber"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardNumberElement,
            },
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          label="Expiration Date"
          name="ccexp"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardExpiryElement,
            },
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <Tooltip
          title={<img src={CVCtooltip} alt="CVC" />}
          placement="top"
          arrow
        >
          <TextField
            label="CVC Code"
            name="cvc"
            variant="outlined"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
              },
            }}
          />
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default PaymentForm;
