import React from "react";
import { Router, Route } from "react-router-dom";

import Profile from "components/Pages/Profile";
import EditTeamMember from "components/Pages/TeamMembers/Edit/";
import CreateTrainingSeries from "components/Pages/TrainingSeries/Add/CreateTrainingSeries";
import EditTrainingSeries from "components/Pages/TrainingSeries/Edit/";
import AddTeamMember from "components/Pages/TeamMembers/Add/";
import CreateMessage from "components/Pages/TrainingSeries/Add/CreateMessage";
import MessagePage from "components/Pages/TrainingSeries/Add/MessagePage";
import HelpModal from "components/UI/HelpModal/HelpModal.js";
import ContactModal from "components/UI/ContactModal/ContactModal.js";

import AddMemberToTrainingSeries from "components/Pages/TrainingSeries/Add/AddMemberToTrainingSeries.js";

import Dashboard from "../Dashboard";

function Routes(props) {
  const { setDisplaySnackbar, history, setIsTourOpen } = props;
  const disableSnackbar = () => {
    setDisplaySnackbar(false);
  };
  const activateTutorial = () => {
    props.history.push("/teamMember");
    setIsTourOpen(true);
  };
  return (
    <Router history={history}>
      <Route
        exact
        path="/teamMember/help"
        render={renderProps => (
          <HelpModal
            {...renderProps}
            history={props.history}
            userId={props.user.id}
          />
        )}
      />
      <Route
        exact
        path="/teamMember/contact"
        render={renderProps => (
          <ContactModal
            {...renderProps}
            history={props.history}
            userId={props.user.id}
          />
        )}
      />
      <Route
        exact
        path="/teamMember"
        render={renderProps => (
          <Dashboard
            {...renderProps}
            disableSnackbar={disableSnackbar}
            history={props.history}
            user_id={props.user.id}
          />
        )}
      />
      <Route
        path="/teamMember/profile"
        render={renderProps => (
          <Profile
            {...renderProps}
            activateTutorial={activateTutorial}
            disableSnackbar={disableSnackbar}
          />
        )}
      />
      <Route
        path="/teamMember/team-member/:id"
        render={renderProps => (
          <EditTeamMember {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/teamMember/create-team-member/"
        render={renderProps => (
          <AddTeamMember {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/teamMember/create-training-series"
        render={renderProps => (
          <CreateTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/teamMember/training-series/:id"
        render={renderProps => (
          <EditTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/teamMember/create-message"
        render={renderProps => <CreateMessage {...renderProps} />}
      />

      <Route
        path="/teamMember/assign-members/:id"
        render={renderProps => (
          <AddMemberToTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route path="/teamMember/message/:id" component={MessagePage} />
    </Router>
  );
}

export default Routes;
