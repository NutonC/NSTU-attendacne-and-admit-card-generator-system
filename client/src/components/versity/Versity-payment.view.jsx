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

import VersityInvoices from "./Versity-invoices.component";

import { httpGetStripeInvoices } from "../../requests/payment.requests";

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

function VersityPaymentView() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [invoices, setInvoices] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchInvoicesData = async () => {
      const responseData = await httpGetStripeInvoices();
      if (responseData && responseData.data) {
        setInvoices(responseData.data);
      }
    };
    fetchInvoicesData();
  }, []);

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
              <Tab label="Invoices" />
              <Tab label="Subscription Details" />
            </CustomizedTabs>
          </Grid>
          <TabPanel value={value} index={0}>
            <VersityInvoices invoicesData={invoices} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>Coming soon</div>
          </TabPanel>
        </Grid>
      </Paper>
    </Container>
  );
}

export default VersityPaymentView;
