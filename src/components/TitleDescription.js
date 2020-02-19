import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

function TitleDescription(props) {
  return (
    <>
      <Typography
        variant={props.variant}
        paragraph
        color={props.headerColor ? props.headerColor : "primary"}
      >
        {props.headerText}
      </Typography>
      <Typography paragraph>{props.description}</Typography>
    </>
  );
}

TitleDescription.propTypes = {
  variant: PropTypes.string.isRequired,
  headerColor: PropTypes.string,
  headerLink: PropTypes.string,
  headerText: PropTypes.string,
  description: PropTypes.string
};

export default TitleDescription;
