import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { getUser } from 'store/actions/userActions'

import { lock } from 'Auth/AuthPasswordless'

import TeamMemberAppBar from './TeamMemberAppBar'
import SimpleTabs from './SimpleTabs'

class TeamMemberDashboard extends Component {
  state = {
    authDone: false,
    authError: false
  }

  componentDidMount() {
    lock.on('authenticated', this.setTokens)

    if (localStorage.getItem('Profile')) {
      this.setState({ authDone: true })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.authDone !== this.state.authDone) {
      this.props.getUser()
    }
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

    if (this.state.authDone && this.props.userLoaded) {
      if (this.props.userId === this.props.adminId || this.props.newUserProfile) {
        return <Redirect to="/home" />
      }
      
      return (
        <>
          <TeamMemberAppBar />
          <SimpleTabs />
        </>
      )
    }

    return null
  }
}

const mapStateToProps = state => ({
  userLoaded: state.userReducer.doneLoading,
  userId:
    state.userReducer.userProfile.user && state.userReducer.userProfile.user.id,
  adminId:
    state.userReducer.userProfile.admin &&
    state.userReducer.userProfile.admin.user_id,
  newUserProfile: state.userReducer.userProfile.newUser
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamMemberDashboard)
