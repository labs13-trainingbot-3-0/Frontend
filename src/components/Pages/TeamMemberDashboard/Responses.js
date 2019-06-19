import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import orderBy from 'lodash/orderBy'

import { withStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'

const styles = {
  paper: {
    margin: '5px auto',
    padding: '16px',
    height: '100%',
    width: '95%'
  }
}

class Responses extends React.Component {
  render() {
    const notif = this.props.notifications.map(item => ({
      date: moment(item.send_date).format('MMM Do, YYYY, h:mm a'),
      name: item.admin_name,
      text: `${item.subject} ${item.body}`
    }))

    const resp = this.props.responses.map(item => ({
      date: moment(item.created_at).format('MMM Do, YYYY, h:mm a'),
      name: item.first_name,
      text: `${item.response}`
    }))

    const messages = orderBy([...notif, ...resp], ['date'])

    return (
      <Paper elevation={2} className={this.props.classes.paper}>
        {messages.map(item => (
          <List>
            <ListItem>
              <ListItemText primary={item.text} secondary={item.date}/>
            </ListItem>
          </List>
        ))}
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.userReducer.userProfile.notificationsFromAdmin,
  responses: state.userReducer.userProfile.responsesToAdmin
})

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Responses))
