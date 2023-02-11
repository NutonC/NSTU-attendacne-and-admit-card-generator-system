import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import CustomAlert from "../custom-alert/Custom-alert.component";
import SubscriptionDetails from "../subscription-package-details/Subscription-package-details.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5.4),
    textAlign: "justify",
  },
  card: {
    display: "flex",
    flexDirection: "row",
  },
  innerPaper: {
    display: "flex",
    padding: "20px",
  },
  gridItem: {
    display: "flex",
    width: "100%",
    margin: "0 auto",
  },
  customTooltip: {
    fontSize: "1rem",
  },
}));

const SectionTitle = ({ children }) => (
  <Paper>
    <Typography variant="h4">{children}</Typography>
  </Paper>
);

const VersityDashboard = ({ currentUser }) => {
  const classes = useStyles();
  const { tokenCode, tokenType, tokenUseLeft } = currentUser.tokenData;
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SectionTitle>Register Management</SectionTitle>
          <Paper className={classes.paper}>
            <Tooltip
              classes={{ tooltip: classes.customTooltip }}
              title={"Share this token to your university managers"}
            >
              <Typography>
                Token Code : <b>{tokenCode}</b>
              </Typography>
            </Tooltip>
            <Typography>Token Type : {tokenType}</Typography>
            <Typography>Token Use Left : {tokenUseLeft}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SectionTitle>Subscription Details</SectionTitle>
          <SubscriptionDetails
            subscribedPackage={currentUser.subscribedPackage}
            enrollDate={currentUser.packageEnrolled}
            expiryDate={currentUser.packageExpiration}
          />
        </Grid>

        {currentUser?.managementUsers.length && (
          <Grid item xs={12}>
            <SectionTitle>Total Registered Management Accounts</SectionTitle>
            <Paper className={classes.paper}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">Name</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">Email</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">Phone</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6">Joined</Typography>
                </Grid>
              </Grid>
              {currentUser?.managementUsers.length &&
                currentUser.managementUsers.map((user, i) => (
                  <Grid key={i} container spacing={4}>
                    <Grid item xs={12} sm={3}>
                      <Typography>{user.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography>{user.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography>{user.phone}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography>
                        {new Date(user.joined).toLocaleDateString("DE-de")}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
            </Paper>
          </Grid>
        )}
      </Grid>
      <CustomAlert
        icon={<InfoOutlined />}
        message={
          "Provide the TOKEN CODE to your university management team, to register with your university"
        }
      />
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(VersityDashboard);
