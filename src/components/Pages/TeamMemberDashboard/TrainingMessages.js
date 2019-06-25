import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { getNotificationResponses } from '../../../store/actions'

// MUI
import { withStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import TablePagination from '@material-ui/core/TablePagination'
import Typography from '@material-ui/core/Typography'

// Icons
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import TextsmsOutlined from '@material-ui/icons/TextsmsOutlined'
import EmailOutlined from '@material-ui/icons/EmailOutlined'
import slack_black_logo from 'img/slack_black_logo.png'

const styles = {
  paper: {
    margin: '5px auto',
    padding: '16px',
    height: '100%',
    width: '95%'
  },
  resp: {
    paddingLeft: '64px'
  },
  respWithoutIcon: {
    paddingLeft: '60px'
  },
  slack: {
    height: '100%',
    width: '50px',
    margin: '0px - 13px'
  }
}

class TrainingMessages extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    showNotifId: ''
  }

  handleChangePage = (event, newPage) => this.setState({ page: newPage })

  handleChangeRowsPerPage = event =>
    this.setState({ rowsPerPage: +event.target.value })

  handleClickListItem = id => {
    this.props.getNotificationResponses(id)
    if (this.state.showNotifId === id) {
      this.setState({ showNotifId: '' })
      return
    }
    this.setState({ showNotifId: id })
  }

  render() {
    const profile = JSON.parse(localStorage.getItem('Profile'))

    // show notifications if their send date is in the past
    const sentNotif = this.props.notifFromAdmin.filter(
      notif => moment(notif.send_date) < moment()
    )

    // for pagination
    const notifByPage = sentNotif.slice(
      this.state.page * this.state.rowsPerPage,
      this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
    )

    return !sentNotif.length ? (
      <Paper elevation={2} className={this.props.classes.paper}>
        <Typography align="center" color="textSecondary">
          You haven't had a training activity yet.
        </Typography>
      </Paper>
    ) : (
      <Paper elevation={2} className={this.props.classes.paper}>
        {notifByPage.map(notif => (
          <div key={notif.id}>
            <List>
              <ListItem
                button
                onClick={() => this.handleClickListItem(notif.id)}
              >
                {notif.name === 'twilio' && (
                  <ListItemIcon>
                    <TextsmsOutlined />
                  </ListItemIcon>
                )}

                {notif.name === 'sendgrid' && (
                  <ListItemIcon>
                    <EmailOutlined />
                  </ListItemIcon>
                )}

                {notif.name === 'slack' && (
                  <ListItemIcon>
                    <img
                      className={this.props.classes.slack}
                      src={slack_black_logo}
                      alt="monochrome Slack app logo"
                    />
                  </ListItemIcon>
                )}

                <ListItemText
                  primary={`${notif.subject} | ${notif.series}`}
                  secondary={notif.body}
                />

                <Typography color="textSecondary">
                  {moment(notif.send_date).format('MMMM Do, YYYY')}
                </Typography>

                {this.state.showNotifId === notif.id ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>

              <Collapse
                in={this.state.showNotifId === notif.id}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {!this.props.resp.length ? (
                    <ListItem>
                      <ListItemText
                        secondary="You haven't responded to this message yet."
                        className={this.props.classes.respWithoutIcon}
                      />
                    </ListItem>
                  ) : (
                    this.props.resp.map(resp => (
                      <ListItem
                        key={resp.id}
                        className={this.props.classes.resp}
                      >
                        {resp.recipient_id === this.props.user.id ? (
                          <ListItemAvatar>
                            <Avatar src={profile.picture} alt={profile.name} />
                          </ListItemAvatar>
                        ) : (
                          <ListItemAvatar>
                            <Avatar>
                              {this.props.admin.first_name[0].toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                        )}
                        <ListItemText
                          primary={resp.body}
                          secondary={moment(resp.created_at).format(
                            'MMMM Do, YYYY'
                          )}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
              </Collapse>
            </List>

            <Divider light />
          </div>
        ))}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          count={sentNotif.length}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          component="div"
        />
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  notifFromAdmin: state.userReducer.userProfile.notificationsFromAdmin,
  resp: state.responsesReducer.responses,
  user: state.userReducer.userProfile.user,
  admin: state.userReducer.userProfile.admin
})

const mapDispatchToProps = dispatch => ({
  getNotificationResponses: id => dispatch(getNotificationResponses(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TrainingMessages))