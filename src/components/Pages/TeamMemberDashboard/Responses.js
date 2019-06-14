import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import orderBy from 'lodash/orderBy'

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
      <>
        {messages.map(item => (
          <p>
            {item.name} | {item.text} | {item.date}
          </p>
        ))}
      </>
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
)(Responses)
