import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import TitleDescription from "./TitleDescription";
import BarWithIcons from "./BarWithIcons";
import PackageCardGridList from "./PackageCardGridList";

import { fetchReadmeHeader } from "../service/apiHook";
const useStyles = makeStyles(theme => ({
  packageContentBox: {
    marginBottom: "16px"
  }
}));

function NpmPackageSection(props) {
  const classes = useStyles();
  const [libraries, setLibraries] = useState([]);
  useEffect(() => {
    async function callAllApi() {
      const apis = props.data.map(e => fetchReadmeHeader(e.repo));
      const data = await Promise.all(apis);
      let updatedLibs = props.data.map((e, i) => {
        props.addLink("NPM Packages", data[i]);
        return {
          ...e,
          title: data[i]
        };
      });
      setLibraries(updatedLibs);
    }
    callAllApi();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <TitleDescription
        variant="h5"
        headerColor="primary"
        headerLink="npm-packages"
        headerText="NPM Packages"
        description="The following PX Blue resources are available through NPM."
      />

      {libraries.map((e, i) => {
        const icons = [
          {
            iconLabel: "github-link",
            icon: "GitHub",
            iconLink: `https://github.com/pxblue/${e.repo}/tree/master`
          },
          {
            iconLabel: "bug-status",
            icon: "BugReport",
            badge: {
              content: 8,
              color: "error"
            }
          }
        ];

        return (
          <Box className={classes.packageContentBox} key={i}>
            <BarWithIcons
              link={e.title}
              label={e.title}
              buildStatus={e.buildStatus}
              icons={icons}
            />
            <PackageCardGridList data={e.packages} />
          </Box>
        );
      })}
      <br />
    </>
  );
}

export default NpmPackageSection;
