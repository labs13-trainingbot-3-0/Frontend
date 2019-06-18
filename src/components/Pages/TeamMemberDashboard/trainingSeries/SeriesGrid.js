import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
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
  
  // const clickHandler = (id) => {
  //   props.openSeries(id)
  // }
  

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }} />
        {props.seriesData.map(tile => (
          <GridListTile 
            onClick={()=>props.openSeries()} 
            key={tile.id}>
            <img src="http://lorempixel.com/400/200/business" alt='random image'/>
            <GridListTileBar
              title={tile.title}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
