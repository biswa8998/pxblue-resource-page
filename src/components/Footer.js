import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

function Footer(props) {
  return (
    <>
      <Divider />
      <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
        Power Xpert Blue is a part of the Center for Connected Intelligent
        Solutions (CCIS).
      </Typography>
      <Typography variant="h6" align="center" color="primary">
        Learn more about our other offerings.
      </Typography>
    </>
  );
}

export default Footer;
