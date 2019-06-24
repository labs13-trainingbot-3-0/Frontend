import React from 'react'
import { connect } from 'react-redux'
import { getNotificationResponses } from '../../../store/actions'

import moment from 'moment'
import orderBy from 'lodash/orderBy'

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

const styles = {
  paper: {
    margin: '5px auto',
    padding: '16px',
    height: '100%',
    width: '95%'
  }, 
  resp: {
    paddingLeft: '64px'
  }
}

class AllTrainings extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    showResponses: false
  }

  handleChangePage = (event, newPage) => this.setState({ page: newPage })

  handleChangeRowsPerPage = event =>
    this.setState({ rowsPerPage: +event.target.value })

  handleListItemClick = id => {
    this.props.getNotificationResponses(id)
    this.setState({ showResponses: !this.state.showResponses })
  }

  render() {
    const profile = JSON.parse(localStorage.getItem('Profile'))

    return !this.props.notif.length ? (
      <Paper elevation={2} className={this.props.classes.paper}>
        <Typography align="center" color="textSecondary">
          You haven't had a training activity yet.
        </Typography>
      </Paper>
    ) : (
      <Paper elevation={2} className={this.props.classes.paper}>
        {this.props.notif
          .slice(
            this.state.page * this.state.rowsPerPage,
            this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
          )
          .map(item => (
            <div key={item.id}>
              <List>
                <ListItem
                  button
                  onClick={() => this.handleListItemClick(item.id)}
                >
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${item.subject} | ${item.series}`}
                    secondary={item.body}
                  />
                  <Typography>
                    {moment(item.send_date).format('MMMM Do, YYYY')}
                  </Typography>
                  {this.state.showResponses ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse
                  in={this.state.showResponses}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {!this.props.resp.length ? (
                      <Typography align="center" color="textSecondary">
                        You haven't responded to this message yet.
                      </Typography>
                    ) : (
                      this.props.resp.map(item => (
                        <ListItem className={this.props.classes.resp}>
                          {item.recipient_id === this.props.member.user.id ? (
                            <ListItemAvatar>
                              <Avatar
                                src={profile.picture}
                                alt={profile.name}
                              />
                            </ListItemAvatar>
                          ) : (
                            <ListItemAvatar>
                              <Avatar>{this.props.member.admin.first_name[0].toUpperCase()}</Avatar>
                            </ListItemAvatar>
                          )}
                          <ListItemText primary={item.body} />
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
          count={this.props.notif.length}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          component="div"
        />
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  notif: state.userReducer.userProfile.notificationsFromAdmin,
  resp: state.responsesReducer.responses,
  member: state.userReducer.userProfile
})

const mapDispatchToProps = dispatch => ({
  getNotificationResponses: id => dispatch(getNotificationResponses(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AllTrainings))
