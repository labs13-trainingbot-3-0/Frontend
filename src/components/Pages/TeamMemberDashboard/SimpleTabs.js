import React from 'react'

import TrainingSeries from './trainingSeries/TrainingSeries'
import AllTrainings from './AllTrainings'

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
            <Tab label="View Training Series" />
            <Tab label="View All Trainings" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <TrainingSeries />}
        {this.state.value === 1 && <AllTrainings />}
      </>
    )
  }
}

export default withStyles(styles)(SimpleTabs)
