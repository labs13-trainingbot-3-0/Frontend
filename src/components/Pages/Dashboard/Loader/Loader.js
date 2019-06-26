// parent component for app once logged in
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { DashboardContainer } from "./styles.js";
import ProgressCircle from "components/UI/Progress/ProgressCircle";
import AppBar from "components/Navigation/AppBar/AppBar";
import ReturnToPreviousPageButton from "components/Navigation/ReturnToPreviousPage";
import Snackbar from "components/UI/Snackbar/Snackbar";
import DashboardTour from "components/UI/Tour/Tour";

import authenticate from "components/Misc/authenticate/authenticate";
import DashboardRoutes from "../Routes";
import { getUser } from "store/actions/userActions"

function Loader(props) {
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(true);
  const { getUser, newUser, location } = props;
  const { state } = location;

  useEffect(() => getUser(), [getUser])

  useEffect(() => {
    // componentDidUpdate (CDU) --> update when props.newUser changes
    setIsTourOpen(newUser);
  }, [newUser]);

  useEffect(() => {
    // componentDidUpdate (CDU) --> update when props.location.state changes
    if (state && state.success) {
      setDisplaySnackbar(true);
    }
  }, [state]);

  return (
    <>
      {props.doneLoading ? (
        <>
          {displaySnackbar && (
            <Snackbar
              message="Your team members have been successfully added."
              type="success"
            />
          )}
          <AppBar />
          {props.location.pathname !== "/home" && (
            <ReturnToPreviousPageButton history={props.history} />
          )}
          <DashboardContainer>
            <DashboardRoutes
              {...props}
              user={props.userProfile.user}
              setDisplaySnackbar={setDisplaySnackbar}
              history={props.history}
              setIsTourOpen={setIsTourOpen}
            />
            <DashboardTour
              isTourOpen={isTourOpen}
              closeTour={() => setIsTourOpen(false)}
              newUser={props.newUser}
            />
          </DashboardContainer>
        </>
      ) : (
        <ProgressCircle />
      )}
    </>
  );
}

const mapStateToProps = state => ({
  userProfile: state.userReducer.userProfile,
  doneLoading: state.userReducer.doneLoading,
  newUser: state.userReducer.newUser
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(authenticate(Loader));
