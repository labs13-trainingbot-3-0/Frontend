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

class AllTrainings extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5
  }

  handleChangePage = (event, newPage) => this.setState({ page: newPage })
  handleChangeRowsPerPage = event =>
    this.setState({ rowsPerPage: +event.target.value })

  render() {
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
          .map((item, index) => (
            <div key={index}>
              <List>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.subject} | ${item.series}`}
                    secondary={item.body}
                  />
                  <Typography>
                    <br />
                    {moment(item.send_date).format('MMMM Do, YYYY')}
                  </Typography>
                </ListItem>
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
  notif: state.userReducer.userProfile.notificationsFromAdmin
})

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(AllTrainings))
