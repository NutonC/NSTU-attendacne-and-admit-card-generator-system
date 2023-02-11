import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { Modal, Backdrop, Fade, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    paddingTop: "50rem",
  },
  paper: {
    width: "60vw",
    backgroundColor: "rgb(11, 19, 43)",
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    color: "white",
  },
  title: {
    color: "white",
    paddingLeft: "1rem",
  },
}));

const PopupModalButton = ({ title, startIcon, modal, children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="contained"
        color="primary"
        startIcon={startIcon || <EditIcon />}
      >
        {children}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className={classes.title}>
              {title}
            </h2>
            {modal}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default PopupModalButton;
