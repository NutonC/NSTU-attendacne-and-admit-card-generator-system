import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  alertBox: {
    backgroundColor: "rgba(137, 196, 244, 0.1)",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
    padding: "1rem 0",
  },
}));

const CustomAlert = ({ icon, message }) => {
  const classes = useStyles();
  return (
    <Box className={classes.alertBox}>
      {icon}
      <Typography>{message}</Typography>
    </Box>
  );
};

export default CustomAlert;
