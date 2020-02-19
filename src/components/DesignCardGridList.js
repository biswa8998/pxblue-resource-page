import React from "react";
import Grid from "@material-ui/core/Grid";
import { Spacer } from "@pxblue/react-components";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "../App.css";

const useStyles = makeStyles(theme => ({
  rowRoot: {
    width: "100%",
    display: "flex",
    padding: "4px 0px",
    borderRadius: "8px"
  },
  angular: {
    backgroundColor: "#c400300f",
    border: "1px solid #c40030"
  },
  react: {
    backgroundColor: "#62dafc3b",
    border: "1px solid #62dafc"
  },
  ionic: {
    backgroundColor: "#3980ff3b",
    border: "1px solid #3980ff"
  },
  buildStatusPass: {
    backgroundColor: "#39b620"
  },
  buildStatusFail: {
    backgroundColor: "#f0aa1f"
  },
  buildLabel: {
    backgroundColor: "#5e696e"
  },
  cardRoot: {
    padding: "4px"
  },
  cardRootContent: {
    padding: "8px"
  },
  cardActionRoot: {
    padding: "4px 8px"
  },
  avatarSmall: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: "#ffffff"
  },
  paperRoot: {
    marginTop: "8px",
    "& div": {
      "& .paper-div": {
        width: "100%",
        height: "200px"
      }
    }
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
  },
  avatarLabelRoot: {
    width: "120px",
    height: "30px",
    marginTop: "6px",
    padding: "0px 6px"
  },
  avatar: {
    float: "left"
  },
  linkRoot: {
    padding: "4px",
    marginTop: "4px"
  },
  logoImg: {
    width: "70%"
  }
}));

function DesignCardGridList(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.paperRoot}>
      {props.data.map(platform => {
        const platformType =
          platform.name.toLowerCase().indexOf("react") !== -1
            ? "react"
            : platform.name.toLowerCase();
        return (
          <Grid item xs={12} md={4} key={platform.name}>
            <div
              className={`${classes.rowRoot} ${classes[platformType]} card-elevated`}
            >
              <div className={classes.avatarLabelRoot}>
                <Avatar className={`${classes.avatarSmall} ${classes.avatar}`}>
                  <img
                    src={`./img/${platformType}.svg`}
                    className={classes.logoImg}
                    alt={platform.name}
                  />
                </Avatar>
                <Typography variant="subtitle2" style={{ marginLeft: "30px" }}>
                  {platform.name}
                </Typography>
              </div>
              <Spacer></Spacer>
              <span style={{ padding: "5px 8px" }}>
                <span className={`buildTagLeft ${classes.buildLabel}`}>
                  build
                </span>
                <span
                  className={`buildTagRight ${
                    platform.build === "pass"
                      ? classes.buildStatusPass
                      : classes.buildStatusFail
                  }`}
                >
                  {platform.build}
                </span>
              </span>
              <Typography variant="subtitle2" className={classes.linkRoot}>
                <Link
                  href="#"
                  onClick={event => {
                    event.preventDefault();
                    window.open(platform.demo, "_blank");
                  }}
                >
                  Demo
                </Link>
              </Typography>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default DesignCardGridList;
