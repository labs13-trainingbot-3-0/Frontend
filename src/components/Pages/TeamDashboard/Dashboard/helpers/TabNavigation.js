import React, { useState } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
// import PermIdentity from "@material-ui/icons/PermIdentityOutlined";
import Home from "@material-ui/icons/HomeOutlined";
import QuestionAnswer from "@material-ui/icons/QuestionAnswerOutlined";
// import Timeline from "@material-ui/icons/TimelineOutlined";
import ModeComment from "@material-ui/icons/ModeCommentOutlined";
import { withStyles } from "@material-ui/core/styles";
import { styles, Popover } from "../styles.js";

function TabNavigation(props) {
  const { classes, newResponses } = props;
  const [overviewHover, setOverviewHover] = useState(false);
  // const [teamMembersHover, setTeamMembersHover] = useState(false);
  // const [trainingSeriesHover, setTrainingSeriesHover] = useState(false);
  const [messagesHover, setMessagesHover] = useState(false);
  const [responsesHover, setResponsesHover] = useState(false);

  return (
    <BottomNavigation
      data-tour={window.innerWidth < 650 ? "7" : null}
      value={props.topTab}
      onChange={(e, value) => {
        props.setTopTab(value);
      }}
      style={{
        width: "100%",
        whiteSpace: "nowrap",
        background: "rgb(255,255,255)",
        position: "relative"
      }}
    >
      <BottomNavigationAction
<<<<<<< HEAD
        label="Overview"
        value="overview"
=======
        label="Training Series"
        value="Training Series"
>>>>>>> b03646075607d53924ff8320bbfa66c702b1d1cc
        icon={<Home />}
        color="primary"
        onMouseEnter={e => {
          setOverviewHover(true);
        }}
        onMouseLeave={e => {
          setOverviewHover(false);
        }}
      />
      <Popover
        style={overviewHover ? { display: "block" } : { display: "none" }}
      >
<<<<<<< HEAD
        Overview
      </Popover>
      <BottomNavigationAction
=======
        Training Series
      </Popover>
      {/* <BottomNavigationAction
>>>>>>> b03646075607d53924ff8320bbfa66c702b1d1cc
        label="Team Members"
        value="team members"
        icon={<PermIdentity />}
        onMouseEnter={e => {
          setTeamMembersHover(true);
        }}
        onMouseLeave={e => {
          setTeamMembersHover(false);
        }}
      />
      <Popover
        style={teamMembersHover ? { display: "block" } : { display: "none" }}
      >
        Team Members
<<<<<<< HEAD
      </Popover>
      <BottomNavigationAction
=======
      </Popover> */}
      {/* <BottomNavigationAction
>>>>>>> b03646075607d53924ff8320bbfa66c702b1d1cc
        label="Training Series"
        value="training series"
        icon={<Timeline />}
        onMouseEnter={e => {
          setTrainingSeriesHover(true);
        }}
        onMouseLeave={e => {
          setTrainingSeriesHover(false);
        }}
      />
      <Popover
        style={trainingSeriesHover ? { display: "block" } : { display: "none" }}
      >
        Training Series
<<<<<<< HEAD
      </Popover>
      <BottomNavigationAction
        label="Notifications"
        value="notifications"
=======
      </Popover> */}
      <BottomNavigationAction
        label="All Trainings Chronologically"
        value="All Trainings Chronologically"
>>>>>>> b03646075607d53924ff8320bbfa66c702b1d1cc
        icon={<QuestionAnswer />}
        onMouseEnter={e => {
          setMessagesHover(true);
        }}
        onMouseLeave={e => {
          setMessagesHover(false);
        }}
      />
      <Popover
        style={messagesHover ? { display: "block" } : { display: "none" }}
      >
<<<<<<< HEAD
        Notifications
=======
        All Trainings Chronologically
>>>>>>> b03646075607d53924ff8320bbfa66c702b1d1cc
      </Popover>
      <BottomNavigationAction
        onClick={() => {
          props.setTopTab("responses");
        }}
        label="Responses"
        value="responses"
        icon={<ModeComment />}
        onMouseEnter={e => {
          setResponsesHover(true);
        }}
        onMouseLeave={e => {
          setResponsesHover(false);
        }}
      />
      {newResponses.length ? <div className={classes.circle} /> : ""}
      <Popover
        style={responsesHover ? { display: "block" } : { display: "none" }}
      >
        Responses
      </Popover>
    </BottomNavigation>
  );
}
export default withStyles(styles)(TabNavigation);
