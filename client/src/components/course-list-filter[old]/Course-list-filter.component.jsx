import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  makeStyles,
  Grid,
  Container,
  Paper,
} from "@material-ui/core";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTeacherCourses } from "../../redux/teacher/teacher.selectors";

import CourseList from "./Course-list.component";

const useStyles = makeStyles((theme) => ({
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

  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    textAlign: "center",
    boxShadow: "0 0 28px rgb(0 0 0 / 8%)",
  },
}));

function CourseListFilter({ teacherCourses }) {
  const classes = useStyles();

  const [courseStatus, setCourseStatus] = useState("");

  const filterOptions = {
    isAll: "",
    isRunning: "running",
    isCompleted: "completed",
  };

  const filteredCourses = () => {
    return teacherCourses.filter((currentCourse) => {
      return currentCourse.status.includes(courseStatus);
    });
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ borderRadius: "10px" }}>
            <div className={classes.root}>
              <ButtonGroup
                style={{ margin: "20px" }}
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  variant={
                    courseStatus === filterOptions.isAll
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    courseStatus === filterOptions.isAll ? "primary" : "default"
                  }
                  onClick={() => setCourseStatus(filterOptions.isAll)}
                >
                  All Courses
                </Button>
                <Button
                  variant={
                    courseStatus === filterOptions.isRunning
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    courseStatus === filterOptions.isRunning
                      ? "primary"
                      : "default"
                  }
                  onClick={() => setCourseStatus(filterOptions.isRunning)}
                >
                  Running Courses
                </Button>
                <Button
                  variant={
                    courseStatus === filterOptions.isCompleted
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    courseStatus === filterOptions.isCompleted
                      ? "primary"
                      : "default"
                  }
                  onClick={() => setCourseStatus(filterOptions.isCompleted)}
                >
                  Completed Courses
                </Button>
              </ButtonGroup>
            </div>
            <Grid container>
              <CourseList courses={filteredCourses()} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  teacherCourses: selectTeacherCourses,
});

export default connect(mapStateToProps, null)(CourseListFilter);
