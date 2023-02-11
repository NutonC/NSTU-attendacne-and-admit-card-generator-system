import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    boxShadow: "0 0 28px rgb(0 0 0 / 8%)",
    borderRadius: "10px",
    height: "250px",
  },
  contactTitle: {
    color: "#1b00ff",
    fontWeight: "600",
    fontSize: "18px",
    marginBottom: "20px",
  },
  listHeading: {
    fontWeight: "500",
    fontSize: "14px",
    color: "#1b00ff",
    paddingBottom: "5px",
  },
  listText: {
    fontWeight: "500",
    fontSize: "14px",
    paddingBottom: "15px",
  },
}));

export default function Contact({ email, phone, teacherUID, studentUID }) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.contactTitle}>
            Contact Information
          </Typography>
          <Typography variant="h6" className={classes.listHeading}>
            Email Address:
          </Typography>
          <Typography variant="body1" className={classes.listText}>
            {email}
          </Typography>
          <Typography variant="h6" className={classes.listHeading}>
            Phone Number:
          </Typography>
          <Typography variant="body1" className={classes.listText}>
            {phone}
          </Typography>
          {teacherUID && (
            <>
              <Typography variant="h6" className={classes.listHeading}>
                Teacher Id:
              </Typography>
              <Typography variant="body1" className={classes.listText}>
                {teacherUID}
              </Typography>
            </>
          )}
          {studentUID && (
            <>
              <Typography variant="h6" className={classes.listHeading}>
                Teacher Id:
              </Typography>
              <Typography variant="body1" className={classes.listText}>
                {studentUID}
              </Typography>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
