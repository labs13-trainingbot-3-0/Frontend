import React, { Component } from 'react'
import { Redirect } from 'react-router'

import AppBar from 'components/Navigation/AppBar'
import { lock } from 'Auth/AuthPasswordless'

class TeamMemberDashboard extends Component {
  state = {
    authDone: false,
    authError: false
  }

  componentDidMount() {
    lock.on('authenticated', this.setTokens)
  }

  setTokens = authResult => {
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('access_token', authResult.accessToken)
    lock.getUserInfo(authResult.accessToken, this.setProfile)
  }

  setProfile = (error, profile) => {
    if (error) {
      this.setState({ authError: true })
    }
    if (profile) {
      localStorage.setItem('Profile', JSON.stringify(profile))
      this.setState({ authDone: true })
    }
  }

  render() {
    if (this.state.authError) {
      return <Redirect to="/" />
    }
    if (this.state.authDone) {
      return <AppBar />
    }
    return null
  }
}
export default TeamMemberDashboard
