import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Paper, Grid, Typography } from "@material-ui/core";
import ProfilePicture from "../../assets/profile.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    boxShadow: "0 0 28px rgb(0 0 0 / 8%)",
    borderRadius: "10px",
  },
  heading: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1b3133",
  },
  identity: {
    fontSize: "14px",
    lineHeight: "1.71rem",
    color: "#6c757d",
  },
}));

export default function Identity({
  name,
  versityName,
  departmentName,
  teacherTitle,
  semesterData,
  session,
}) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Paper className={classes.paper} style={{ minHeight: "250px" }}>
          <img
            src={ProfilePicture}
            alt=""
            style={{ height: "160px", width: "160px" }}
          />
          <Typography className={classes.heading} variant="h5">
            {name}
          </Typography>
          {teacherTitle && (
            <Typography className={classes.identity} variant="body1">
              {teacherTitle}
            </Typography>
          )}
          <Typography className={classes.identity} variant="body1">
            {versityName}
          </Typography>
          {departmentName && (
            <Typography className={classes.identity} variant="body1">
              Deparment: {departmentName}
            </Typography>
          )}
          {semesterData && semesterData.length > 0 && (
            <Typography className={classes.identity} variant="body1">
              Semester: {semesterData[semesterData.length - 1].semesterNumber}
            </Typography>
          )}
          {session && (
            <Typography className={classes.identity} variant="body1">
              Session: {session}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
