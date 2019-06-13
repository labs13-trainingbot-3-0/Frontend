import React from 'react'
import { connect } from 'react-redux'
import { getTrainingSeries } from  'store/actions'
import SeriesGrid from './SeriesGrid';
import SeriesModal from './SeriesModal';
import Container from '@material-ui/core/Container';
import ProgressCircle from 'components/UI/Progress/ProgressCircle';
import './trainingSeries.css'


const dummyData = [
  { title:"Hazardous Material Policy", image: 'https://truckerpath.com/uploads/2017/02/HAZMAT.jpg'},
  { title:"Taxes and Witholding", image: 'https://www.gannett-cdn.com/-mm-/73d0c51d7092d111f30c6c876cceb8310bcb4ec2/c=0-34-580-360&r=x803&c=1600x800/local/-/media/2017/11/02/USATODAY/usatsports/tax-1040-with-money_large.jpg'},
  { title: "Vacation and Time Off", image: 'http://www.30aluxuryvacations.com/sites/default/files/styles/homepage_slideshow_big/public/slides/slideshow-chairs.jpg?itok=6sZeBUHM'},
  { title: "Company Computer Policy", image: 'https://images.pond5.com/young-businesswoman-working-computer-office-footage-018091108_prevstill.jpeg'},
  { title: "Your Fidelity 401k", image: 'https://fidelitylogin.org/wp-content/uploads/2018/01/Fidelity-Investments-Login.jpg'}
];

class TrainingSeries extends React.Component {
  state = {
    series: [],
    seriesModal: false,
    seriesClicked: 1
  }

  componentDidMount() {
    this.setState({
      series: [...dummyData]
    })
  }

  openSeriesModal() {
    this.setState({
      seriesModal: true
  })}

  closeSeriesModal() {
    this.setState({
      seriesModal: false
    })
  }

  render() {
    return (
      <Container>
        {this.state.series.length > 0 ?
        <SeriesGrid 
          openSeries={this.state.openSeriesModal}
          seriesData={this.state.series}/>:
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
