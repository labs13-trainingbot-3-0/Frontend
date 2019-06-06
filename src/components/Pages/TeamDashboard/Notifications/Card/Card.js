// Parent "card" container for any Notification displays
import React, { useState, Suspense } from "react";
import { connect } from "react-redux";

import filter from "./filter.js";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core/";
import Pagination from "material-ui-flat-pagination";
import { styles, MessageContainer, MainContainer } from "./styles.js";

function Card(props) {
  const [offset, setOffset] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const { classes, List } = props;
  const limit = props.limit || 5;

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
            {notifNum} Notification{plural}
          </Typography>
          <Typography variant="h5" className={classes.smTitle}>
            {notifNum} Notification{plural}
          </Typography>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <List
            getFiltered={(items, member_id) =>
              filter({ items, pagination, member_id })
            }
            member_id={props.member_id}
          />
        </Suspense>
        {!notificationsCount && (
          <MessageContainer>
            <p style={{ marginBottom: "70px" }}>
              {props.isLoading
                ? "Loading your Notifications."
                : `You do not have any Notifications.`}
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
