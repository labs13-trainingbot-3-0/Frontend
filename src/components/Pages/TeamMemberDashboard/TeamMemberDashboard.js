import React, { Component } from 'react'

import AppBar from 'components/Navigation/AppBar'
import { lock } from "Auth/AuthPasswordless";

class TeamMemberDashboard extends Component {
  state = {
    auth0Done: false
  }

  componentDidMount() {
    lock.on('authenticated', this.setTokens)
  }

  setTokens = authResult => {
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('access_token', authResult.accessToken);
    lock.getUserInfo(authResult.accessToken, this.setProfile)
  }

  setProfile = (error, profile) => {
    localStorage.setItem("Profile", JSON.stringify(profile));
    this.setState({auth0Done: true})
  }

  render() {
    return this.state.auth0Done ? <AppBar /> : null
  }
}
export default TeamMemberDashboard
