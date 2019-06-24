import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import NotificationsCard from "components/Pages/TeamMemberDashboard/NotificationsOverview/TeamMemberNotificationsCard";
import NotificationsOverview from "components/Pages/TeamMemberDashboard/NotificationsOverview/Overview";

import { DashWrapper } from "../Dashboard/Dashboard/styles.js";

function Dashboard(props) {
  const [newResponses, setNewResponses] = useState([]);

  const {
    user_id,
    notificationsFromAdmin
  } = props;

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
  null
)(Dashboard);
