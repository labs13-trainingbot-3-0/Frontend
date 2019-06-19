import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses } from "store/actions";

import NotificationsCard from "components/Pages/TeamMemberDashboard/NotificationsOverview/TeamMemberNotificationsCard.js";
import NotificationsOverview from "components/Pages/TeamMemberDashboard/NotificationsOverview/Overview.js";

import { DashWrapper } from "../Dashboard/Dashboard/styles.js";

function Dashboard(props) {
  const [newResponses, setNewResponses] = useState([]);
  const {
    user_id,
    notificationsFromAdmin,
    getAllResponses: responsesFromProps
  } = props;

  useEffect(() => {
    responsesFromProps();
    setTimeout(() => {
      responsesFromProps();
    }, 60 * 1000);
  }, [responsesFromProps]);

  useEffect(() => {
    setNewResponses(notificationsFromAdmin.filter(r => !r.seen));
  }, [notificationsFromAdmin]);

  return (
    <DashWrapper>
      <div style={{ width: "100%" }}>
        {user_id}
        <NotificationsCard
          List={NotificationsOverview}
          user_id={user_id}
          width="95%"
        />
      </div>
    </DashWrapper>
  );
}

const mapStateToProps = state => ({
  notificationsFromAdmin: state.userReducer.userProfile.notificationsFromAdmin
});

export default connect(
  mapStateToProps,
  { getAllResponses }
)(Dashboard);
