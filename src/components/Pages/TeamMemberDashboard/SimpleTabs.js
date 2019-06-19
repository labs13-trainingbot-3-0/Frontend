import React from 'react'

import TrainingSeries from './trainingSeries/TrainingSeries'
import AllTrainings from './AllTrainings'
import Responses from './Responses'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const styles = {
  tabs: {
    background: 'white',
    color: 'black'
  }
}

class SimpleTabs extends React.Component {
  state = {
    value: 0
  }

  changeTab = (event, newValue) => {
    this.setState({
      value: newValue
    })
  }

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
            <Tab label="Training Series" />
            <Tab label="All Trainings" />
            <Tab label="Responses" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <TrainingSeries />}
        {this.state.value === 1 && <AllTrainings />}
        {this.state.value === 2 && <Responses />}
      </>
    )
  }
}

export default withStyles(styles)(SimpleTabs)
