import React from "react";

import TrainingSeries from "./trainingSeries/TrainingSeries";
import TrainingMessages from "./TrainingMessages";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = {
  tabs: {
    background: "white",
    color: "black"
  }
};

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
          <Tabs
            value={this.state.value}
            onChange={this.changeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={this.props.classes.tabs}
          >
            <Tab id="data-step-1" label="View Training Topics" />
            <Tab id="data-step-3" label="View Training Messages" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <TrainingSeries />}
        {this.state.value === 1 && <TrainingMessages />}
      </>
    );
  }
}

export default withStyles(styles)(SimpleTabs);
