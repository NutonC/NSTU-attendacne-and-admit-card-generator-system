import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  makeStyles,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import Logo from "../../assets/logo-2.png";
import NavDrawer from "./Drawer.component";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "inherit",
    position: "sticky",
    top: "0",
    backgroundColor: "#FFFFFF",
    zIndex: 4,
    "& a": {
      textDecoration: "none",
    },
  },
  container: {
    height: "10vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1em",
  },
  box: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1em",
  },
  registerButton: {
    "& .MuiButtonBase-root": {
      borderRadius: "25px",
      fontWeight: "bold",
      backgroundColor: "#F51767",
      color: "white",
    },
  },
  aboutButton: {
    textTransform: "uppercase",
    color: "black",
    fontWeight: "bold",

    "&:hover": {
      color: "gray",
    },
  },
}));

const pages = [
  { name: "Manual", to: "/get-started" },
  { name: "Meet Us", to: "/team" },
];

export default function Navbar() {
  const classes = useStyles();

  const theme = useTheme();
  const hideAboutSectionOnSM = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <Link to={"/"}>
          <img src={Logo} alt="Logo" width={"auto"} height={60} />
        </Link>
        <Box className={classes.box}>
          {hideAboutSectionOnSM && (
            <>
              <Link to={"/get-started"} className={classes.aboutButton}>
                Manual
              </Link>
              <Link to={"/team"} className={classes.aboutButton}>
                Meet Us
              </Link>
            </>
          )}
          <Link to={"/register-university"} className={classes.registerButton}>
            <Button variant="contained">Buy Product</Button>
          </Link>
          {!hideAboutSectionOnSM && <NavDrawer pages={pages} />}
        </Box>
      </Container>
    </Box>
  );
}
