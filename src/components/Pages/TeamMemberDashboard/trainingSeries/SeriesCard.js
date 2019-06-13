import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './seriesCard.css'

const useStyles = makeStyles({
    card: {
        minWidth: 200,
        maxWidth: 345,
        margin: 10
    },
    media: {
        height: 140,
    },
});

export default function SeriesCard(props) {
    const classes = useStyles();

    return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
            className={classes.media}
            image={props.seriesData.image}
            title={props.seriesData.title}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.seriesData.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
            View Materials
                </Button>
      </CardActions>
    </Card>
  );
}