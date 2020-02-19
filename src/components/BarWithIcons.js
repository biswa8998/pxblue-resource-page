import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Spacer } from "@pxblue/react-components";
import Badge from "@material-ui/core/Badge";
import "../App.css";
import PropTypes from "prop-types";
import * as Icons from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  palette: {
    backgroundColor: "#d7b024",
    height: "16px",
    minWidth: "16px",
    width: "16px"
  },
  componentRoot: {
    width: "100%",
    display: "flex",
    backgroundColor: "#eef0f0",
    padding: "12px 0px"
  },
  linkPackageHeaders: {
    paddingLeft: "4px"
  },
  buildLabel: {
    backgroundColor: "#5e696e"
  },
  buildStatusPass: {
    backgroundColor: "#39b620"
  },
  buildStatusFail: {
    backgroundColor: "#f0aa1f"
  },
  npmPackageIcon: {
    padding: "4px",
    marginLeft: "4px",
    color: "#5e696d"
  }
}));

function BarWithIcons(props) {
  const classes = useStyles();
  return (
    <div className={classes.componentRoot}>
      <div>
        <Typography
          variant="h6"
          component="h6"
          color="primary"
          id={props.label}
          className={classes.linkPackageHeaders}
        >
          {props.label}
        </Typography>
      </div>
      <Spacer flex={1} />
      <div style={{ padding: "0px 12px" }}>
        {props.buildStatus && (
          <span style={{ padding: "8px" }}>
            <span className={`buildTagLeft ${classes.buildLabel}`}>build</span>
            <span
              className={`buildTagRight ${
                props.buildStatus === "pass"
                  ? classes.buildStatusPass
                  : classes.buildStatusFail
              }`}
            >
              {props.buildStatus}
            </span>
          </span>
        )}
        {props.icons &&
          props.icons.map((obj, i) => {
            const IconComponent = Icons[obj.icon];
            return (
              <IconButton
                color={obj.iconColor ? obj.iconColor : "primary"}
                aria-label={obj.iconLabel}
                component="span"
                className={classes.npmPackageIcon}
                size="small"
                key={i}
                onClick={ev => {
                  ev.preventDefault();
                  obj.iconLink && window.open(obj.iconLink, "_blank");
                }}
              >
                {obj.badge ? (
                  <Badge
                    badgeContent={obj.badge.content ? obj.badge.content : 0}
                    color={obj.badge.color ? obj.badge.color : "primary"}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                    }}
                    classes={{ badge: classes.palette }}
                  >
                    <IconComponent />
                  </Badge>
                ) : (
                  <IconComponent />
                )}
              </IconButton>
            );
          })}
      </div>
    </div>
  );
}

BarWithIcons.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string.isRequired,
  buildStatus: PropTypes.oneOf(["pass", "fail"]),
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      iconColor: PropTypes.string,
      iconLabel: PropTypes.string.isRequired,
      badge: PropTypes.shape({
        content: PropTypes.number,
        color: PropTypes.string
      })
    })
  ).isRequired
};

export default BarWithIcons;
