import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProgressCircle from "components/UI/Progress/ProgressCircle";
import Microlink from "@microlink/react";
import styled from "styled-components";
import "./accordion.css";

const CustomMicrolink = styled(Microlink)`
  font-family: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace';
  max-width: 100%;
  border-radius: 0.42857em;
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function Accordion(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.messages ? (
        props.messages
          .filter(message => {
            return message.training_series_id === props.seriesId;
          })
          .map(message => {
            return (
              <ExpansionPanel key={message.id}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    {message.subject}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                 <div className="container">
                  <Typography>{message.body}</Typography>
                  {message.link ? (
                    <CustomMicrolink url={message.link} size="medium" />
                  ) : (
                    <CustomMicrolink
                      url={`https://res.cloudinary.com/trainingbot3/image/upload/v1560961513/training-bot_pl6bji.svg`}
                      size="small"
                    />
                  )}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
      ) : (
        <ProgressCircle />
      )}

      {/* <ExpansionPanel >
        <ExpansionPanelSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id ="panel1a-header">
          <Typography className={classes.heading}>      Expansion Panel 1 
          </Typography> 
        </ExpansionPanelSummary> 
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur         adipiscing elit.Suspendisse malesuada lacus         ex,
            sit amet blandit leo lobortis eget.
          </Typography> 
       </ExpansionPanelDetails> 
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary 
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel2a-content"
          id="panel2a-header" >
          <Typography className={classes.heading}> 
            Expansion Panel 2 
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails> 
      </ExpansionPanel> 
      <ExpansionPanel disabled >
        <ExpansionPanelSummary 
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel3a-content"
          id="panel3a-header">
          <Typography className={classes.heading}> 
            Disabled Expansion Panel 
          </Typography> 
        </ExpansionPanelSummary> 
      </ExpansionPanel>  */}
    </div>
  );
}
