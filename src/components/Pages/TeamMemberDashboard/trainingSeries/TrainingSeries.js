import React from 'react'
import { connect } from 'react-redux'
import { getTrainingSeries } from  'store/actions'
import SeriesGrid from './SeriesGrid';
import SeriesModal from './SeriesModal';
import Container from '@material-ui/core/Container';
import ProgressCircle from 'components/UI/Progress/ProgressCircle';
import './trainingSeries.css'
import axios from 'axios'

class TrainingSeries extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      series: [],
      seriesModal: false,
      seriesClicked: -1
    }
  }

  async componentDidMount() {
    const mySeries = await axios.get(`${process.env.REACT_APP_API}/api/training-series`);
    console.log(`Check out this mySeries object: `, mySeries.data)
    const myMessages = await axios.get(`${process.env.REACT_APP_API}/api/messages`)
    console.log(`Check out this myMessages object: `, myMessages.data)
    this.setState({
      trainingSeries: mySeries.data.trainingSeries,
      messages: myMessages.data.messages
    })
  }

  openSeriesModal = (id) => {
    console.log(`state = `, this.state)
    this.setState({
      ...this.state,
      seriesModal: true,
      seriesClicked: id
  })
}

  closeSeriesModal = () => {
    console.log('Hello from closeSeriesModal')
    this.setState({
      ...this.state,
      seriesModal: false
    })
  }

  render() {
    return (
      <Container>
        {this.state.trainingSeries  ?
        <SeriesGrid 
          openSeries={this.openSeriesModal}
          seriesData={this.state.trainingSeries}/>:
        <ProgressCircle />}
        <SeriesModal 
          messages={this.state.messages}
          seriesId={this.state.seriesClicked}
          show={this.state.seriesModal}
          handleClose={this.closeSeriesModal}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries
})
export default connect(mapStateToProps, { getTrainingSeries })(TrainingSeries)
