import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses } from "store/actions";

import NotificationsCard from "components/Pages/Notifications/Card";
import NotificationsOverview from "components/Pages/TeamMemberDashboard/NotificationsOverview/Overview.js";

import { DashWrapper } from "../Dashboard/Dashboard/styles.js";

function Dashboard(props) {
  const [newResponses, setNewResponses] = useState([]);
  const { user_id, responses, getAllResponses: responsesFromProps } = props;

  useEffect(() => {
    responsesFromProps();
    setTimeout(() => {
      responsesFromProps();
    }, 60 * 1000);
  }, [responsesFromProps]);

  useEffect(() => {
    setNewResponses(responses.filter(r => !r.seen));
  }, [responses]);

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
  responses: state.responsesReducer.responses
});

export default connect(
  mapStateToProps,
  { getAllResponses }
)(Dashboard);
