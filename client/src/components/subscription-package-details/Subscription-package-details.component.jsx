import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: "justify",
  },
}));

function SubscriptionDetails({
  subscribedPackage,
  enrollDate,
  expiryDate,
  price,
}) {
  const classes = useStyles();
  const [dateDiff, setDateDiff] = useState(null);

  useEffect(() => {
    const date1 = new Date();
    const date2 = new Date(expiryDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDateDiff(diffDays);
  }, [enrollDate, expiryDate]);

  return (
    <Paper className={classes.paper}>
      <Typography>Package Type : {subscribedPackage}</Typography>
      {enrollDate && expiryDate && (
        <>
          <Typography>
            Enroll Date : {new Date(enrollDate).toLocaleDateString("de-DE")}
          </Typography>
          <Typography>
            Expiration Date : {new Date(expiryDate).toLocaleDateString("de-DE")}
          </Typography>
          <Typography>Days Left : {dateDiff}</Typography>
        </>
      )}
      {price && <Typography>Price : $ {price}</Typography>}
    </Paper>
  );
}

export default SubscriptionDetails;
