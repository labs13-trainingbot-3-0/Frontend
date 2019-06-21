import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import orderBy from 'lodash/orderBy'

// MUI
import { withStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import TablePagination from '@material-ui/core/TablePagination'
import Typography from '@material-ui/core/Typography'

const styles = {
  paper: {
    margin: '5px auto',
    padding: '16px',
    height: '100%',
    width: '95%'
  }
}

class Responses extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5
  }

  handleChangePage = (event, newPage) => this.setState({ page: newPage })
  handleChangeRowsPerPage = event =>
    this.setState({ rowsPerPage: +event.target.value })

  render() {
    const notif = this.props.notifications.map(item => ({
      date: moment(item.send_date).format('MMM Do, YYYY, h:mm a'),
      name: item.admin_name,
      text: `${item.subject} ${item.body}`
    }))

    const resp = this.props.responses.map(item => ({
      date: moment(item.created_at).format('MMM Do, YYYY, h:mm a'),
      name: `${item.first_name} ${item.last_name}`,
      text: `${item.response}`
    }))

    const messages = orderBy([...notif, ...resp], ['date'])

    const profile = JSON.parse(localStorage.getItem('Profile'))

    return !messages.length ? (
      <Paper elevation={2} className={this.props.classes.paper}>
        <Typography align="center" color="textSecondary">
          You've had no correspondence with your Admin yet.
        </Typography>
      </Paper>
    ) : (
      <Paper elevation={2} className={this.props.classes.paper}>
        {messages
          .slice(
            this.state.page * this.state.rowsPerPage,
            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
          )
          .map((item, index) => (
            <div key={index}>
              <List>
                <ListItem>
                  {item.name.toLowerCase() === profile.name.toLowerCase() ? (
                    <ListItemAvatar>
                      <Avatar src={profile.picture} alt={profile.name} />
                    </ListItemAvatar>
                  ) : (
                    <ListItemAvatar>
                      <Avatar>{item.name[0].toUpperCase()}</Avatar>
                    </ListItemAvatar>
                  )}
                  <ListItemText primary={item.text} secondary={item.date} />
                </ListItem>
              </List>
              <Divider light />
            </div>
          ))}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          count={messages.length}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          component="div"
        />
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
