import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: 'row',
    justifyContent: "space-around",
    overflow: "hidden",
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridList: {
    width: 800,
    height: 450

  },
  icon: {
    color: "rgba(69, 20, 118, 0.74)"
  }
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();

  

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
          <Paper className={classes.paper}>Click on a training topic to reveal messages</Paper>
      </Grid>
        <GridList 
          cellHeight={180} 
          className={classes.gridList}
          spacing={5}>
          
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}/>
            {props.seriesData.map((tile, i) => (
             
                <GridListTile
                  id="data-step-2"
                  onClick={() => props.openSeries(tile.id)}
                  key={tile.id}
                >
                  <img src={tile.image} alt="series cover" />
                  <GridListTileBar title={tile.title}/>
                </GridListTile>
            
          ))}
        </GridList>
    </Grid>
  )
}
