import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import TitleDescription from "./TitleDescription";
import BarWithIcons from "./BarWithIcons";
import DesignCardGridList from "./DesignCardGridList";

const useStyles = makeStyles(theme => ({
  packageContentBox: {
    marginBottom: "16px"
  }
}));

function DesignExampleSection(props) {
  const classes = useStyles();
  return (
    <>
      <TitleDescription
        variant="h5"
        headerColor="primary"
        headerLink="design-examples"
        headerText="Design Examples"
        description="The following table shows the current status of the PX Blue design pattern code samples available from GitHub. There are also links to running examples with live-editing capability."
      />
      {props.data.map((e, i) => {
        const icons = [
          {
            iconLabel: "github-link",
            icon: "GitHub",
            iconLink: e.link
          },
          {
            iconLabel: "bug-status",
            icon: "BugReport",
            badge: {
              content: e.bugs,
              color: "primary"
            }
          }
        ];
        props.addLink("Design Examples", e.repo);
        return (
          <Box className={classes.packageContentBox} key={i}>
            <BarWithIcons link={e.title} label={e.repo} icons={icons} />
            <DesignCardGridList data={e.platform} />
          </Box>
        );
      })}
    </>
  );
}

export default DesignExampleSection;
