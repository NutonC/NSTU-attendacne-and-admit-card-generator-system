import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import HeaderDropdown from "./Header-dropdown.component";
import ProfilePic from "../../assets/profile.png";

const useStyles = makeStyles(() => ({
  image: {
    height: "100%",
    width: "100%",
    borderRadius: "100%",
  },
  container: {
    height: "70px",
    width: "inherit",
    background: "#fff",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1em",
  },
  boxContainer: {
    display: "flex",
    alignItems: "center",
  },
  imageContainer: {
    height: "52px",
    width: "52px",
    marginRight: "10px",
  },
  avatar: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "black",
    cursor: "pointer",
    marginRight: "10px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  },
}));

function Header({ currentUser }) {
  const classes = useStyles();
  const { name } = currentUser;
  return (
    <Grid container>
      <Grid item xs={12} className={classes.container}>
        <Box className={classes.boxContainer}>
          <Box className={classes.imageContainer}>
            <img src={ProfilePic} alt={"Profile"} className={classes.image} />
          </Box>
          <Typography variant="subtitle1">{name}</Typography>
        </Box>
        <Avatar className={classes.avatar}>
          <HeaderDropdown />
        </Avatar>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(Header);
