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
    flexDirection: 'row',
    justifyContent: "space-around",
    overflow: "hidden"
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
      <h3>Click on a training series to reveal messages</h3>
      <GridList 
        cellHeight={180} 
        className={classes.gridList}
        spacing={26}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }} />
        {props.seriesData.map((tile, i) => (
          <GridListTile
            id="data-step-2"
            onClick={() => props.openSeries(tile.id)}
            key={tile.id}
          >
            <img src={tile.image} alt="series cover" />
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
  )
}
