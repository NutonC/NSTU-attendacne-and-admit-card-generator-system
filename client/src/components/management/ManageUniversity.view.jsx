import React, { useState } from "react";
import {
  Tabs,
  Tab,
  makeStyles,
  withStyles,
  Grid,
  Container,
  Paper,
} from "@material-ui/core";
import Session from "./Session.component";
import Course from "./Course.component";
import Department from "./Department.component";
import Semester from "./Semester.component";
import Hall from "./Hall.component";

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

function ManageUniversity() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

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
              <Tab label="Department" />
              <Tab label="Semester" />
              <Tab label="Session" />
              <Tab label="Hall" />
              <Tab label="Course" />
            </CustomizedTabs>
          </Grid>

          <TabPanel value={value} index={0}>
            <Department />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Semester />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Session />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Hall />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Course />
          </TabPanel>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ManageUniversity;
