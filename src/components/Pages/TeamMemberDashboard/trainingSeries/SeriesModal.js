import React from "react";
import Button from "@material-ui/core/Button";
import Accordion from "./Accordion";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import './seriesModal.css'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function SeriesModal(props) {
  const classes = useStyles();

  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => props.handleClose()}
      >
        Go Back
      </Button>
      <Accordion />
    </div>
  );
}

export default SeriesModal;
