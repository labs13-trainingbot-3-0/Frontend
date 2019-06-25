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
import Typography from '@material-ui/core/Typography'

const styles = {
  logo: {
    height: '35px'
  },
  modal: {
    backgroundColor: 'white',
    outline: 'none',
    width: '50%',
    height: '50vh',
    margin: '20vh auto'
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
                <IconButton
                  onClick={() => this.setState({ openModal: true })}
                  color="inherit"
                  aria-label="Help"
                >
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

        <Modal
          open={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
        >
          <Typography className={this.props.classes.modal}>
            Text in a modal
          </Typography>
        </Modal>
      </>
    )
  }
}

export default withStyles(styles)(TeamMemberAppBar)
