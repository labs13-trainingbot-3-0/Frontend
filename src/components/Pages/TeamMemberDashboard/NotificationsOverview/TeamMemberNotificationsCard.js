// Parent "card" container for any Notification displays
import React, { useState, Suspense } from "react";
import { connect } from "react-redux";

import filter from "../../Notifications/Card/filter.js";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core/";
import Pagination from "material-ui-flat-pagination";

import {
  styles,
  MessageContainer,
  MainContainer
} from "../../Notifications/Card/styles.js";

function Card(props) {
  const [serviceFilter] = useState("all");
  const [statusFilter] = useState("sent");
  const [offset, setOffset] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const { classes, List } = props;
  const limit = props.limit || 5;

  const filters = { status: statusFilter, service: serviceFilter };
  const notifNum = notificationsCount ? notificationsCount : "No";
  const plural = notificationsCount === 1 ? "" : "s";
  const pagination = { limit, offset, setMax: setNotificationsCount };

  return (
    <MainContainer>
      <Paper
        data-tour="5"
        style={{ width: props.width || "100%" }}
        className={classes.root}
        elevation={2}
      >
        <div className={classes.columnHeader}>
          <Typography variant="h5" className={classes.lgTitle}>
            {notifNum} Previous Training Message{plural}
          </Typography>
          <Typography variant="h5" className={classes.smTitle}>
            {notifNum} Previous Training Message{plural}
          </Typography>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <List
            getFiltered={(items, member_id) =>
              filter({ items, pagination, filters, member_id })
            }
            filters={filters}
            member_id={props.member_id}
          />
        </Suspense>
        {!notificationsCount && (
          <MessageContainer>
            <p style={{ marginBottom: "70px" }}>
              {props.isLoading
                ? "Loading your Training Messages..."
                : `You do not have any previous Training Messages.`}
            </p>
          </MessageContainer>
        )}
        <div className={classes.footer}>
          <Pagination
            limit={limit}
            offset={offset}
            total={notificationsCount}
            centerRipple={true}
            onClick={(e, newOffset) => setOffset(newOffset)}
          />
        </div>
      </Paper>
    </MainContainer>
  );
}

const mapStateToProps = state => ({
  isLoading: state.notificationsReducer.isLoading
});

export default connect(mapStateToProps)(withStyles(styles)(Card));
