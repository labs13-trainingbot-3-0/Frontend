import React from 'react'

import { logout } from '../../../Auth/AuthPasswordless'
import Logo from 'img/training-bot.png'

// MUI
import { withStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import HelpOutline from '@material-ui/icons/HelpOutline'

const styles = {
  logo: {
    height: '35px'
  }
}

class TeamMemberAppBar extends React.Component {
  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Home">
            <img
              src={Logo}
              alt="A cute, personable robot"
              className={this.props.classes.logo}
            />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="Help">
            <HelpOutline />
          </IconButton>
          <Avatar
            src={JSON.parse(localStorage.getItem('Profile')).picture}
            alt={JSON.parse(localStorage.getItem('Profile')).name}
          />
          <Button onClick={() => logout()} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TeamMemberAppBar)
