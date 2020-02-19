import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import * as Colors from "@pxblue/colors-branding";
import "../App.css";

const useStyles = makeStyles(theme => ({
  cardRoot: {
    padding: "4px",
    backgroundColor: Colors.blue["50"]
  },
  cardRootContent: {
    padding: "8px"
  },
  packageFullName: {
    fontSize: "1rem"
  },
  packageCardDesc: {
    height: "75px",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 4,
    "-webkit-box-orient": "vertical"
  }
}));

function PackageCard(props) {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={`${classes.cardRoot} card-elevated`}>
      <CardContent className={classes.cardRootContent}>
        <Typography
          variant="h6"
          component="h6"
          className={classes.packageFullName}
        >
          <Link
            href="#"
            onClick={event => {
              event.preventDefault();
              window.open(props.link, "_blank");
            }}
          >
            {props.title}
          </Link>
        </Typography>
        <Typography color="textSecondary" variant="overline">
          {props.version}
        </Typography>
        <Typography
          variant="caption"
          component="p"
          className={classes.packageCardDesc}
        >
          {props.desc.substr(0, props.desc.indexOf(".") + 1)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PackageCard;
