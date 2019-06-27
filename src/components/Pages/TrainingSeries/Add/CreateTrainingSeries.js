import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addTrainingSeries } from "store/actions/trainingSeriesActions";
import ProgressCircle from "components/UI/Progress/ProgressCircle";

import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField, Divider } from "@material-ui/core/";
import { styles, MainContainer } from "./CreateTrainingSeriesStyles.js";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {BrandingWatermark, DragHandleSharp} from '@material-ui/icons';

class CreateTrainingSeries extends React.Component {
  state = {
    title: "",
    image: 'https://res.cloudinary.com/trainingbot3/image/upload/v1560976963/stock%20business/iStock-Unfinished-Business-1_klcs1y.jpg',
    isRouting: false
  };

  handleChange = name => event => {
    this.setState({ 
      ...this.state,
      [name]: event.target.value });
  };
  
  handleTrainingSeriesSubmit = e => {
    e.preventDefault();
    const data = { 
      title: this.state.title, 
      image: this.state.image,
      user_id: this.props.user_id 
    };
    this.props.addTrainingSeries(data);

    this.setState({ isRouting: true });

    setTimeout(() => {
      this.props.history.push(
        `/home/training-series/${this.props.trainingSeriesID}`
      );
    }, 1000);
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.history.push("/home");
  };

  render() {
    const { classes } = this.props;
    return this.state.isRouting ? (
      <ProgressCircle />
    ) : (
      <MainContainer style={{ position: "relative" }}>
        <InfoPopup
          top={"15px"}
          left={"50px"}
          popOverText={
            <p>
              This is step one of creating a training series! First, give the series a title. Second, either provide an image link or use the default cover image. Then you'll be forwarded to a page to start creating messages
              and adding team members.
            </p>
          }
        />
        <div className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Create A New Training Series
          </Typography>
          <Divider className={classes.divider} />
          <form
            onSubmit={e => this.handleTrainingSeriesSubmit(e)}
            className={classes.container}
            autoComplete="off"
          >
            <TextField
              id="standard-name"
              label="Title"
              className={classes.textField}
              value={this.state.title}
              onChange={this.handleChange("title")}
              margin="normal"
              required
            />
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-helper">Cover-Image</InputLabel>
                    <Select
                     value={this.state.image}
                     onChange={this.handleChange('image')}
                     input={<Input name="image" id="age-helper" />}
                    >       
                      <MenuItem value={this.state.image}>
                       <em>Default</em>
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1560977037/stock%20business/1425489402-vince-vaughn-appearing-free-cheesy-stock-images-you-can-download-getty-4_hdhro6.jpg'}>
                        Teamwork
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1560961513/training-bot_pl6bji.svg'}>
                        Training Bot
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561602509/training%20series%20covers/iyon6mli5rt3vmdx84gv.jpg'}>
                        Larry Legend
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657168/AdobeStock_241497134_oatvov.jpg'}>
                        Galaxy Brain 
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561602611/training%20series%20covers/nzsyfwr0rdcigqqexyek.jpg'}>
                        Evel Knievel
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657159/AdobeStock_175461355_bakwai.eps'}>
                        Speed of Thought
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657167/AdobeStock_216265057_zi7q8b.jpg'}>
                        Clockwork
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657166/AdobeStock_220900675_p2zhpc.jpg'}>
                        Augmented Reality
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657158/AdobeStock_211395193_gdonis.jpg'}>
                        Helping Hands 
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657156/AdobeStock_210019224_t797yh.jpg'}>
                        Warehouse
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657155/AdobeStock_81225145_1_ugslxt.eps'}>
                        Connection
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657149/AdobeStock_78694248_g2ftvs.jpg'}>
                        Collaboration
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657142/AdobeStock_136928973_izmtpa.eps'}>
                        Training
                      </MenuItem>
                      <MenuItem value={'https://res.cloudinary.com/trainingbot3/image/upload/v1561657141/AdobeStock_206164844_p2povg.ai'}>
                        Data
                      </MenuItem>
                    </Select>
                  <FormHelperText>Select a default cover image</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <img 
                  style= {{width: '100%', height: 'auto' }}
                  src={this.state.image}
                  alt='training series cover'
                  label='Image Preview'
                />
              </Grid>
            </Grid>
            <div>
              <Button
                type="submit"
                variant="outlined"
                className={classes.createButton}
              >
                Create
              </Button>
              <Button
                className={classes.button}
                onClick={e => this.handleCancel(e)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </MainContainer>
    );
  }
}

CreateTrainingSeries.propTypes = {
  classes: PropTypes.object.isRequired
};

const CreateTrainingSeriesWrapped = withStyles(styles)(CreateTrainingSeries);

const mapStateToProps = state => {
  return {
    isAdding: state.trainingSeriesReducer.isAdding,
    addSuccess: state.trainingSeriesReducer.addSuccess,
    trainingSeriesID: state.trainingSeriesReducer.trainingSeriesID
  };
};

export default connect(
  mapStateToProps,
  { addTrainingSeries }
)(CreateTrainingSeriesWrapped);
