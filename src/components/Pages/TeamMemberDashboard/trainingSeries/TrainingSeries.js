import React from "react";
import { connect } from "react-redux";
import SeriesGrid from "./SeriesGrid";
import SeriesModal from "./SeriesModal";
import Container from "@material-ui/core/Container";
import ProgressCircle from "components/UI/Progress/ProgressCircle";
import "./trainingSeries.css";
import axios from "axios";

class TrainingSeries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesModal: false,
      seriesClicked: -1,
      filteredNotifications: []
    };
  }

  async componentDidMount() {
    const getSeries = () => {
      let notifs = this.props.notifications;
      let seriesArr = [];
      for (let i = 0; i < notifs.length; i++) {
        if (seriesArr.indexOf(notifs[i].training_series_id) < 0) {
          seriesArr.push(notifs[i].training_series_id);
        }
      }
      return seriesArr;
    };
    let mySeries = getSeries();
    const getSeriesInfo = num => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.REACT_APP_API}/api/training-series/${num}`)
          .then(response => {
            return resolve(response.data);
          })
          .catch(error => {
            return reject(error.message);
          });
      });
    };
    const getSeriesArray = async () => {
      let seriesArray = [];
      for (let i = 0; i < mySeries.length; i++) {
        await getSeriesInfo(mySeries[i]).then(res => {
          return seriesArray.push(res.trainingSeries);
        });
      }
      return seriesArray;
    };
    let finalSeries = await getSeriesArray();
    this.setState({
      ...this.state,
      trainingSeries: finalSeries
    });
  }

  openSeriesModal = id => {
    const sortNotifications = () => {
      let sorted = this.props.notifications.filter(
        notif => notif.training_series_id === id
      );
      return sorted;
    };
    let filteredNotifications = sortNotifications();
    this.setState({
      ...this.state,
      seriesModal: true,
      seriesClicked: id,
      filteredNotifications: filteredNotifications
    });
  };

  closeSeriesModal = () => {
    this.setState({
      ...this.state,
      seriesModal: false
    });
  };

  render() {
    return (
      <Container>
        {this.state.trainingSeries ? (
          <SeriesGrid
            openSeries={this.openSeriesModal}
            seriesData={this.state.trainingSeries}
          />
        ) : (
          <ProgressCircle />
        )}
        <SeriesModal
          messages={this.state.filteredNotifications}
          seriesId={this.state.seriesClicked}
          show={this.state.seriesModal}
          handleClose={this.closeSeriesModal}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.userReducer.userProfile.notificationsFromAdmin
});
export default connect(
  mapStateToProps,
  null
)(TrainingSeries);
