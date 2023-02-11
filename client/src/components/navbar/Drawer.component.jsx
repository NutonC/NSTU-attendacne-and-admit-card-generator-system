import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Divider,
} from "@material-ui/core";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "black",

    "&:hover": {
      color: "gray",
    },
  },
  icon: {
    color: "white",
  },
}));

function NavDrawer({ pages }) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {pages &&
            pages.map((page, idx) => (
              <div key={idx}>
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Link className={classes.link} to={page.to}>
                      {page.name}
                    </Link>
                  </ListItemText>
                </ListItem>
                <Divider />
              </div>
            ))}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuRoundedIcon color="primary" fontSize="large" />
      </IconButton>
    </>
  );
}
export default NavDrawer;
