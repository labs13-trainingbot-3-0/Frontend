import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

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
          <Tabs value={this.state.value} onChange={this.changeTab}>
            <Tab label="Training Series" />
            <Tab label="All Trainings" />
            <Tab label="Responses" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <SimpleTabs>Training Series</SimpleTabs>}
        {this.state.value === 1 && <SimpleTabs>All Trainings</SimpleTabs>}
        {this.state.value === 2 && <SimpleTabs>Responses</SimpleTabs>}
      </>
    )
  }
}

export default SimpleTabs
