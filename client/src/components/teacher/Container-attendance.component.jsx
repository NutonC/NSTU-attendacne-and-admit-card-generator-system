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

import StudentAttendanceTable from "./Student-attendance-table.component";
import PreviousClasses from "./Previous-classes.component";

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
  bredcrumb: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    padding: "10px 0px",
  },
  paper: {
    marginBottom: "10px",
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

function ContainerAttendance() {
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
              <Tab label="Todays Class" />
              <Tab label="All Classes" />
            </CustomizedTabs>
          </Grid>
          <TabPanel value={value} index={0}>
            <StudentAttendanceTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PreviousClasses />
          </TabPanel>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ContainerAttendance;
