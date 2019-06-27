import React from 'react'

import { logout } from '../../../Auth/AuthPasswordless'
import Logo from 'img/training-bot.png'
import introJs from 'intro.js'
import 'intro.js/introjs.css'

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
            <Grid
              container
              justify="flex-start"
              alignContent="center"
              alignItems="center"
            >
              <Grid item xs={2} sm={2} md={2} lg={1}>
                <IconButton disabled aria-label="Logo">
                  <img
                    src={Logo}
                    alt="A cute, personable robot"
                    className={this.props.classes.logo}
                  />
                </IconButton>
              </Grid>

              <Grid item xs={2} sm={2} md={2} lg={1}>
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

              <Grid item xs="auto" sm="auto" md="auto" lg="auto">
                <Button
                  variant="contained"
                  onClick={e => {
                    e.preventDefault()
                    startIntro()
                  }}
                >
                  Show Tutorial
                </Button>
              </Grid>
            </Grid>

            <Grid container justify="flex-end" alignContent="center">
              <Grid item xs={3} sm={3} md={2} lg={1}>
                <Avatar
                  src={JSON.parse(localStorage.getItem('Profile')).picture}
                  alt={JSON.parse(localStorage.getItem('Profile')).name}
                />
              </Grid>

              <Grid item xs={6} sm={3} md={2} lg={2}>
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
              Congrats on your new job! Training Bot will assist you
              step-by-step as you onboard onto your new team.
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

function startIntro() {
  var intro = introJs()
  intro.setOptions({
    steps: [
      {
        intro:
          'Welcome to your Training Bot Dashboard!  This tutorial will walk you through the basics of where and how your training materials are stored.'
      },
      {
        element: '#data-step-1',
        intro: `"View Training Topics" organizes your training materials by the Training Series that they are a part of.`,
        position: 'left'
      },
      {
        element: '#data-step-2',
        intro:
          "Clicking a Training Topic will pull up a modal with a list of the trainings you've received for that specific series."
      },
      {
        element: '#data-step-3',
        intro: `"View Training Messages" lists ALL training messages you've received ordered chronologically.   
        Try Clicking It Now`,
        position: 'right'
      },
      {
        element: '#data-step-4',
        intro:
          "Clicking a Training Message will show the replies you have sent to the messages you've received, as well as any responses your Team Leader has given.",
        tooltipPosition: 'bottom-middle-aligned,'
      },
      {
        intro:
          "We're thrilled to have you as a part of Training Bot. Take a poke around, and please don't hesitate to contact us if you have any questions or concerns!"
      }
    ]
  })
  intro.start()
}

export default withStyles(styles)(TeamMemberAppBar)
