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
import Grid from '@material-ui/core/Grid'

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
          <Grid container justify="flex-start" alignContent="center">
            <Grid item xs={12} sm={6} md={8} lg={9}>
              <IconButton disabled aria-label="Logo">
                <img
                  src={Logo}
                  alt="A cute, personable robot"
                  className={this.props.classes.logo}
                />
              </IconButton>
              <IconButton color="inherit" aria-label="Help">
                <HelpOutline />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container justify="flex-end" alignContent="center">
            <Grid item xs={4} sm={3} md={2} lg={1}>
              <Avatar
                src={JSON.parse(localStorage.getItem('Profile')).picture}
                alt={JSON.parse(localStorage.getItem('Profile')).name}
              />
            </Grid>
            <Grid item xs={8} sm={3} md={2} lg={2}>
              <Button onClick={() => logout()} variant="outlined">
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TeamMemberAppBar)
