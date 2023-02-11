import React from "react";
import { withRouter } from "react-router";
import { makeStyles, Grid, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { fetchStudentsListOfCourseStart } from "../../redux/teacher/teacher.actions";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },

  containerBox: {
    borderRadius: "5px",
    background: "#64C9CF",
    margin: "15px",
    border: "3px solid transparent",
    cursor: "pointer",
    "&:hover": {
      background: "transparent",
      border: "3px solid #6c757d",
    },
  },

  innerContainer: {
    padding: "20px",
    color: "#fff",
    "&:hover": {
      color: "#6c757d",
    },
  },

  textStyle: {
    fontSize: "18px",
    fontWeight: 600,
    textAlign: "left",
  },
}));

function CourseList({ history, match, onCourseClick, courses }) {
  const classes = useStyles();

  return (
    <>
      {courses.map((data, i) => {
        const { session, semester, coursecode } = data;
        return (
          <Grid
            key={i}
            item
            xs={12}
            sm={4}
            onClick={() => {
              history.push(`${match.url}/${coursecode}`);
              onCourseClick(coursecode);
            }}
          >
            <div className={classes.containerBox}>
              <div className={classes.innerContainer}>
                <Typography variant="subtitle1" className={classes.textStyle}>
                  Session: {session}
                </Typography>
                <Typography variant="subtitle1" className={classes.textStyle}>
                  Semester: {semester}
                </Typography>
                <Typography variant="subtitle1" className={classes.textStyle}>
                  Course Code: {coursecode}
                </Typography>
              </div>
            </div>
          </Grid>
        );
      })}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCourseClick: (courseId) =>
      dispatch(fetchStudentsListOfCourseStart(courseId)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(CourseList));
