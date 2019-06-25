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
import Modal from '@material-ui/core/Modal'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

const styles = {
  logo: {
    height: '35px'
  },
  modal: {
    backgroundColor: 'white',
    outline: 'none',
    width: '40%',
    minHeight: '35vh',
    margin: '20vh auto',
    padding: '20px'
  }
}

class TeamMemberAppBar extends React.Component {
  state = {
    openModal: false
  }

  render() {
    return (
      <>
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
                <Tooltip title="Help" placement="right">
                  <IconButton
                    onClick={() => this.setState({ openModal: true })}
                    color="inherit"
                    aria-label="Help"
                  >
                    <HelpOutline />
                  </IconButton>
                </Tooltip>
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

        <Modal
          open={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
        >
          <div className={this.props.classes.modal}>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome to Training Bot!
            </Typography>
            <Typography paragraph>
              Congrats on your new job! Training Bot will assist you step-by-step as you onboard
              onto your new team.
            </Typography>
            <Typography variant="h6" gutterBottom>
              View Training Topics
            </Typography>
            <Typography paragraph>
              Under 'View Training Topics', you will find a quick overview of
              the activities, organized by topics, that you must complete during
              your onboarding period.
            </Typography>
            <Typography variant="h6" gutterBottom>
              View Training Messages
            </Typography>
            <Typography paragraph>
              Under 'View Training Messages', you will find all conversations
              (via E-mail, SMS or Slack) between you and your Admin. These
              conversations contain your Admin's messages to you regarding
              training activities you are expected to complete as part of your
              onboarding process. They will also contain your responses, if any,
              to those messages.
            </Typography>
          </div>
        </Modal>
      </>
    )
  }
}

export default withStyles(styles)(TeamMemberAppBar)
