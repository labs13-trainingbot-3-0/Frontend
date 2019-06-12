import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TrainingSeries from "./TrainingSeries";
import AllTrainings from "./AllTrainings";
import Responses from "./Responses";

// import { withStyles } from "@material-ui/core/styles";

import styled from "styled-components";

class SimpleTabs extends React.Component {
  state = {
    value: 0
  };

  changeTab = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    return (
      <>
        <AppBar position="static">
          <TabsStyled
            indicatorColor="primary"
            textColor="primary"
            value={this.state.value}
            onChange={this.changeTab}
          >
            <Tab label="Training Series" />
            <Tab label="All Trainings" />
            <Tab label="Responses" />
          </TabsStyled>
        </AppBar>
        {this.state.value === 0 && <TrainingSeries />}
        {this.state.value === 1 && <AllTrainings />}
        {this.state.value === 2 && <Responses />}
      </>
    );
  }
}

const TabsStyled = styled(Tabs)`
  background: white;
  color: black;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export default SimpleTabs;
