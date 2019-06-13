// class AllTrainings extends React.Component {
//   render() {
//     return 'All Trainings'
//   }
// }

// export default AllTrainings

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
      {/* <MobileNav>
        <TabNavigation
          topTab={topTab}
          setTopTab={setTopTab}
          newResponses={newResponses}
        />
      </MobileNav>
      <DesktopNav>
        <DektopNavigation topTab={topTab} setTopTab={setTopTab} />
      </DesktopNav>

      <TripleColumn> */}
      {/* {topTab === "overview" && (
          <>
            <SmallColumns>
              <SearchCard
                user_id={user_id}
                List={TeamMembersOverview}
                containerTourNum="1"
                section="Team Members"
                headerTourNum={["2", "3"]}
                handleAdd={() => history.push("/home/create-team-member")}
              />
              <Divider />
              <SearchCard
                user_id={user_id}
                List={TrainingSeriesOverview}
                containerTourNum="4"
                section="Training Series"
                handleAdd={() => history.push("/home/create-training-series")}
              />
            </SmallColumns>
            <NotificationsCard List={NotificationsOverview} user_id={user_id} />
          </>
        )} */}

      {/* {topTab === "team members" && (
          <SearchCard
            user_id={user_id}
            List={TeamMembersTab}
            section="Team Members"
            handleAdd={() => history.push("/home/create-team-member")}
            isSearching={true}
          />
        )}

        {topTab === "training series" && (
          <SearchCard
            user_id={user_id}
            List={TrainingSeriesTab}
            section="Training Series"
            handleAdd={() => history.push("/home/create-training-series")}
            isSearching={true}
            limit={3}
          />
        )} */}

      <div style={{ width: "100%" }}>
        {user_id}
        <NotificationsCard
          List={NotificationsOverview}
          user_id={user_id}
          width="95%"
        />
      </div>

      {/* {topTab === "responses" && (
          <Responses history={props.history} user_id={user_id} />
        )} */}
      {/* </TripleColumn> */}
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
