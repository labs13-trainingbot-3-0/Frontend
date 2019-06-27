import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const stockPhotos = [
  "https://res.cloudinary.com/trainingbot3/image/upload/v1560977037/stock%20business/1425489402-vince-vaughn-appearing-free-cheesy-stock-images-you-can-download-getty-4_hdhro6.jpg",
  "https://res.cloudinary.com/trainingbot3/image/upload/v1560977020/stock%20business/theyre-king-players-in-the-game-of-business-picture-id494238197_xqy1r3.jpg",
  "https://res.cloudinary.com/trainingbot3/image/upload/v1560977005/stock%20business/173864062_g77yfh.jpg",
  "https://res.cloudinary.com/trainingbot3/image/upload/v1560976990/stock%20business/uk-business1_yktmxb.jpg",
  "https://res.cloudinary.com/trainingbot3/image/upload/v1560976975/stock%20business/slide_407618_5105734_free_fdyapb.jpg",
  "https://res.cloudinary.com/trainingbot3/image/upload/v1560976963/stock%20business/iStock-Unfinished-Business-1_klcs1y.jpg",
  "https://res.cloudinary.com/trainingbot3/image/upload/v1560976944/stock%20business/having-a-positive-attitude-is-rewarding-picture-id588266018_lmcqrq.jpg",
  "https://res.cloudinary.com/trainingbot3/image/upload/v1560976938/stock%20business/iStock-Unfinished-Business-10_xodprl.jpg",
  "https://res.cloudinary.com/trainingbot3/image/upload/v1560976924/stock%20business/979f146a406d3a0b5b58966273a53b32_gklrng.jpg"
];

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
            <img src={stockPhotos[i]} alt="random business" />
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
