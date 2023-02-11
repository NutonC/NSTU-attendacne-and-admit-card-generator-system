import React from "react";
import { makeStyles, MenuList, MenuItem, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import {
  AccountCircleOutlined,
  ImportContactsOutlined,
  Payment,
} from "@material-ui/icons";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const useStyles = makeStyles(() => ({
  menuItemRoot: {
    "&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover": {
      backgroundColor: "#2D46B9",
      margin: "0 8px",
      borderRadius: "4px",
    },
    color: "#fff",
    padding: "15px",
    fontSize: "16px",
    fontWeight: "300",
    letterSpacing: "0.03em",
  },
  menuItemSelected: {},
  heading: {
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "700",
    padding: "10px 0 20px 0",
    textAlign: "center",
  },
}));

function Sidebar({ history, match, location, currentUser }) {
  const classes = useStyles();
  //TODO : split per user role

  return (
    <MenuList>
      <Typography variant="h4" className={classes.heading}>
        Menu
      </Typography>
      <MenuItem
        classes={{
          root: classes.menuItemRoot,
          selected: classes.menuItemSelected,
        }}
        onClick={() => history.push(`${match.url}/profile`)}
        selected={location.pathname === `${match.url}/profile`}
      >
        <AccountCircleOutlined />
        &nbsp; Profile
      </MenuItem>

      {currentUser.uType === "versity" && (
        <div>
          <MenuItem
            classes={{
              root: classes.menuItemRoot,
              selected: classes.menuItemSelected,
            }}
            onClick={() => history.push(`${match.url}/manage`)}
            selected={location.pathname === `${match.url}/manage`}
          >
            <ImportContactsOutlined />
            &nbsp; Manage University
          </MenuItem>
          <MenuItem
            classes={{
              root: classes.menuItemRoot,
              selected: classes.menuItemSelected,
            }}
            onClick={() => history.push(`${match.url}/payment`)}
            selected={location.pathname === `${match.url}/payment`}
          >
            <Payment />
            &nbsp; Payment Details
          </MenuItem>
        </div>
      )}
      {currentUser.uType === "management" && (
        <div>
          <MenuItem
            classes={{
              root: classes.menuItemRoot,
              selected: classes.menuItemSelected,
            }}
            onClick={() => history.push(`${match.url}/manage-university`)}
            selected={location.pathname === `${match.url}/manage-university`}
          >
            <ImportContactsOutlined />
            &nbsp; Manage University
          </MenuItem>
          <MenuItem
            classes={{
              root: classes.menuItemRoot,
              selected: classes.menuItemSelected,
            }}
            onClick={() => history.push(`${match.url}/generate-token`)}
            selected={location.pathname === `${match.url}/generate-token`}
          >
            <ImportContactsOutlined />
            &nbsp; Registration
          </MenuItem>
          <MenuItem
            classes={{
              root: classes.menuItemRoot,
              selected: classes.menuItemSelected,
            }}
            onClick={() => history.push(`${match.url}/dashboard`)}
            selected={location.pathname === `${match.url}/dashboard`}
          >
            <ImportContactsOutlined />
            &nbsp; Dashboard
          </MenuItem>
        </div>
      )}
      {currentUser.uType === "teacher" && (
        <div>
          <MenuItem
            classes={{
              root: classes.menuItemRoot,
              selected: classes.menuItemSelected,
            }}
            onClick={() => history.push(`${match.url}/classes`)}
            selected={location.pathname === `${match.url}/classes`}
          >
            <ImportContactsOutlined />
            &nbsp; Classes
          </MenuItem>
        </div>
      )}
      {currentUser.uType === "student" && (
        <div>
          <MenuItem
            classes={{
              root: classes.menuItemRoot,
              selected: classes.menuItemSelected,
            }}
            onClick={() => history.push(`${match.url}/my-classes`)}
            selected={location.pathname === `${match.url}/my-classes`}
          >
            <ImportContactsOutlined />
            &nbsp; My Classes
          </MenuItem>
        </div>
      )}
    </MenuList>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(withRouter(Sidebar));
