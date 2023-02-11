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
import { InfoOutlined } from "@material-ui/icons";

import CustomAlert from "../custom-alert/Custom-alert.component";
import GenerateStudentToken from "./Generate-student-token.component";
import GenerateTeacherToken from "./Generate-teacher-token.component";

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
      id={`management-generate-token-tabpanel-${index}`}
      aria-labelledby={`management-generate-token-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

function ManagementGenerateToken() {
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
              <Tab label="Teacher" />
              <Tab label="Student" />
            </CustomizedTabs>
          </Grid>

          <TabPanel index={0} value={value}>
            <GenerateTeacherToken />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <GenerateStudentToken />
          </TabPanel>
        </Grid>
        <CustomAlert
          icon={<InfoOutlined />}
          message={
            "Provide TOKEN CODE to respective groups (teachers & students) to allow them to register"
          }
        />
      </Paper>
    </Container>
  );
}

export default ManagementGenerateToken;
