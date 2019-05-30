import React from "react";
//Prop Types
import PropTypes from "prop-types";

//Styles
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
//Redux
import { connect } from "react-redux";
import {
  deleteTrainingSeries,
  deleteTeamMember,
  deleteMessage,
  deleteUser,
  unassignTeamMember
} from "store/actions/";

import { Typography, Paper } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    maxWidth: "300px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "40px 20px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: "20px"
  },
  icons: {
    display: "block",
    width: 20,
    color: "gray",
    cursor: "pointer",
    "&:hover": { color: "#2699FB" }
  }
});

class TrainingSeriesModal extends React.Component {
  state = {
    open: false,
    title: ""
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  clearForm = () => {
    this.setState({ title: "" });
  };

  handleDelete = () => {
    switch (this.props.deleteType) {
      case "message":
        this.props.deleteMessage(this.props.id);
        break;
      case "teamMember":
        this.props.deleteTeamMember(
          this.props.teamMemberId,
          this.props.user_id
        );
        break;
      case "inTeamMemberPage":
        this.props.deleteTeamMember(this.props.teamMemberId);
        break;
      case "trainingSeries":
        this.props.deleteTrainingSeries(
          this.props.trainingSeriesId,
          this.props.user_id
        );
        break;
      case "user":
        this.props.deleteUser(this.props.id);
        this.props.reRouteOnDelete();
        break;
      case "unassign":
        this.props.unassignTeamMember(this.props.id, this.props.ts_id);
        break;
      default:
        break;
    }
    this.handleClose();
  };

  handleDisplayType = () => {
    switch (this.props.displayType) {
      case "button":
        return (
          <Button
            variant="outlined"
            style={{ marginLeft: 10 }}
            onClick={this.handleOpen}
          >
            Delete
          </Button>
        );
      case "text":
        return <p onClick={this.handleOpen}>Delete</p>;
      default:
        const { classes } = this.props;
        return (
          <i
            onClick={this.handleOpen}
            className={`material-icons ${classes.icons}`}
          >
            delete
          </i>
        );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.handleDisplayType()}

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Paper style={getModalStyle()} className={classes.paper}>
            <Typography variant="subheading">
              Are you sure you want to delete this?
            </Typography>
            <Button
              onClick={() => this.handleDelete()}
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Delete Item
            </Button>
          </Paper>
        </Modal>
      </div>
    );
  }
}

TrainingSeriesModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    deleteSuccess: state.teamMembersReducer.status.deleteSuccess
  };
};

const TrainingSeriesModalWrapped = withStyles(styles)(TrainingSeriesModal);

export default connect(
  mapStateToProps,
  {
    deleteMessage,
    deleteTeamMember,
    deleteUser,
    deleteTrainingSeries,
    unassignTeamMember
  }
)(withRouter(TrainingSeriesModalWrapped));
