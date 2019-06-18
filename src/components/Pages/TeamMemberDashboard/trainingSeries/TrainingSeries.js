import React from 'react'
import { connect } from 'react-redux'
import { getTrainingSeries } from  'store/actions'
import SeriesGrid from './SeriesGrid';
import SeriesModal from './SeriesModal';
import Container from '@material-ui/core/Container';
import ProgressCircle from 'components/UI/Progress/ProgressCircle';
import './trainingSeries.css'
import axios from 'axios'


// const dummyData = [
//   { title:"Hazardous Material Policy", image: 'https://truckerpath.com/uploads/2017/02/HAZMAT.jpg', id: 1},
//   { title:"Taxes and Witholding", image: 'https://www.gannett-cdn.com/-mm-/73d0c51d7092d111f30c6c876cceb8310bcb4ec2/c=0-34-580-360&r=x803&c=1600x800/local/-/media/2017/11/02/USATODAY/usatsports/tax-1040-with-money_large.jpg', id: 2},
//   { title: "Vacation and Time Off", image: 'http://www.30aluxuryvacations.com/sites/default/files/styles/homepage_slideshow_big/public/slides/slideshow-chairs.jpg?itok=6sZeBUHM', id: 3},
//   { title: "Company Computer Policy", image: 'https://images.pond5.com/young-businesswoman-working-computer-office-footage-018091108_prevstill.jpeg', id: 4},
//   { title: "Your Fidelity 401k", image: 'https://fidelitylogin.org/wp-content/uploads/2018/01/Fidelity-Investments-Login.jpg', id: 5}
// ];

class TrainingSeries extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      series: [],
      seriesModal: false,
      seriesClicked: 0
    }
    // this.openSeriesModal = this.openSeriesModal.bind(this)
    // this.closeSeriesModal = this.closeSeriesModal.bind(this)
  }

  componentDidMount=()=> {
    axios.get(`${process.env.REACT_APP_API}/api/training-series`)
    .then(res =>
      this.setState({
        ...this.state,
        ...res.data
      })
      )
  }

  openSeriesModal = (id) => {
    console.log(`state = ${this.state}`)
    this.setState({
      ...this.state,
      seriesModal: true,
      seriesClicked: id
  })
}

  closeSeriesModal = (id) => {
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
