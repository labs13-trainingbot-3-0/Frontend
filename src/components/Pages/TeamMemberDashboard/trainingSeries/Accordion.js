import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProgressCircle from "components/UI/Progress/ProgressCircle";
import Microlink from "@microlink/react";
import Container from '@material-ui/core/Container';
import styled from "styled-components";
import "./accordion.css";

 const CustomMicrolink = styled(Microlink)`
  display: flex;
  flex-direction: column;
  font-family: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace';
  max-width: 100%;
  border-radius: 0.42857em;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(69, 20, 118, 0.6); 
  box-shadow: 5px 5px 15px 5px rgba(69, 20, 118, 0.6);
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
    height: "80%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function Accordion(props) {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
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
                  <Container className="container">
                    <Typography>{message.body}</Typography>
                    {message.link ? (
                      <CustomMicrolink url={message.link} size="medium" />
                    ) : (
                        <CustomMicrolink
                          url={`https://res.cloudinary.com/trainingbot3/image/upload/v1560961513/training-bot_pl6bji.svg`}
                          size="medium"
                        />
                      )}
                  </Container>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
      ) : (
        <ProgressCircle />
      )}
    </Container>
  );
}
