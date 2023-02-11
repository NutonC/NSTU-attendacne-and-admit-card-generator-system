import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  makeStyles,
  withStyles,
  Grid,
  Container,
  Paper,
} from "@material-ui/core";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import SemesterAttendance from "./Semester-attendance.component";
import SemesterAttendanceHistory from "./Semester-attendance-history.component";

import { httpGetAllStudentAttendanceBySemesterNumber } from "../../requests/student.requests";

const CustomizedTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#3F51B5",
  },
})(Tabs);

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(12),
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`university-management-tabpanel-${index}`}
      aria-labelledby={`university-management-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

function ContainerSemesters({ currentUser }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);

  const semesterNumber = currentUser.currentSemesterData;

  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await httpGetAllStudentAttendanceBySemesterNumber(
        semesterNumber
      );

      if (response && response?.data.length) {
        setAttendanceData(response.data);
      }
    };

    fetchAttendance();

    return () => {
      setAttendanceData([]);
    }; //Cleanup
  }, [semesterNumber]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Paper>
        <Grid className={classes.container}>
          <Grid item>
            <CustomizedTabs
              value={value}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="Current Semester" />
              <Tab label="Attendance History" />
            </CustomizedTabs>
          </Grid>
          <TabPanel value={value} index={0}>
            <SemesterAttendance
              currentUser={currentUser}
              attendanceData={attendanceData}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SemesterAttendanceHistory
              semesterNumber={semesterNumber}
              attendanceData={attendanceData}
            />
          </TabPanel>
        </Grid>
      </Paper>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(ContainerSemesters);
