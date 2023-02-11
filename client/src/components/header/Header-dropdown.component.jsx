import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import {
  ArrowDropDownSharp,
  ExitToApp,
  SettingsSharp,
} from "@material-ui/icons";

import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";

function HeaderDropdown({ onSignOutStart }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ArrowDropDownSharp
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <SettingsSharp style={{ margin: "0 10px 0 0" }} />
          Setting
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onSignOutStart();
          }}
        >
          <ExitToApp style={{ margin: "0 10px 0 0" }} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOutStart: () => dispatch(signOutStart()),
  };
};

export default connect(null, mapDispatchToProps)(HeaderDropdown);
