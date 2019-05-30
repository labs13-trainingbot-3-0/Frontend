import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getTeamMembers, getNotifications } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Button, Typography } from "@material-ui/core/";
import Pagination from "material-ui-flat-pagination";

import { styles, HeaderContainer, HolderText } from "./styles.js";

function Assign(props) {
  const [offset, setOffset] = useState(0);
  const limit = props.limit || 5;

  const {
    List,
    classes,
    user_id,
    history,
    match: { params },
    getTeamMembers,
    getNotifications
  } = props;

  useEffect(() => {
    getTeamMembers(user_id);
    getNotifications();
  }, [getTeamMembers, getNotifications, user_id]);

  // Filter unique team member IDs from notifications
  // Add is_sent to filter to remove old messages?
  const tmIDs = new Set(
    props.notifications
      .filter(n => n.training_series_id === parseInt(params.id))
      .filter(n => n.recipient_id === n.team_member_id)
      .map(n => n.team_member_id)
  );
  const assignedMembers = props.teamMembers.filter(t => tmIDs.has(t.id));

  return (
    <Paper className={classes.paper}>
      <HeaderContainer>
        <Typography variant="title" className={classes.assignedTitle}>
          Assigned Team Members
        </Typography>
        <Button
          disabled={!props.teamMembers.length}
          className={classes.assignButton}
          variant={"outlined"}
          onClick={() => history.push(`/home/assign-members/${props.ts_id}`)}
        >
          {assignedMembers.length ? "Assign More Members" : "Assign Members"}
        </Button>
      </HeaderContainer>
      <List
        params={params}
        teamMembers={assignedMembers.slice(offset, offset + limit)}
        history={history}
      />
      {props.teamMembers.length && !assignedMembers.length && (
        <>
          <Typography variant="subheading" className={classes.messageTextTop}>
            This training series currently does not have any team members
            assigned to it.
          </Typography>
          <Typography variant="subheading" className={classes.messageText}>
            Click the button above to create assignments.
          </Typography>
        </>
      )}
      {!props.teamMembers.length && !assignedMembers.length && (
        <Typography variant="subheading" className={classes.messageText}>
          <HolderText>
            <p>You don't have any team members to assign.</p>
            <p>
              <Link to="/home/create-team-member">Click here</Link> to add a
              member to your account.
            </p>
          </HolderText>
        </Typography>
      )}
      <Pagination
        limit={limit}
        offset={offset}
        total={assignedMembers.length}
        centerRipple={true}
        onClick={(e, newOffset) => setOffset(newOffset)}
      />
    </Paper>
  );
}

const mapStateToProps = state => ({
  notifications: state.notificationsReducer.notifications,
  teamMembers: state.teamMembersReducer.teamMembers,
  messages: state.messagesReducer.messages
});

export default connect(
  mapStateToProps,
  { getTeamMembers, getNotifications }
)(withStyles(styles)(Assign));
