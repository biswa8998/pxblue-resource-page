import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { fetchNpmData } from "../service/apiHook";
import "../App.css";

import PackageCard from "./PackageCard";

function PackageCardGridList(props) {
  const useStyles = makeStyles(theme => ({
    paperRoot: {
      marginTop: "8px"
    }
  }));

  let packageList = props.data.map(e => {
    return { name: e };
  });
  // eslint-disable-next-line
  const [pack, setPack] = useState(packageList);

  /**
   * We want the data to be fetched once per refresh
   */
  const [libs, setLibs] = useState([]);
  useEffect(() => {
    async function callAllApi() {
      const apis = pack.map(e => fetchNpmData(e.name));
      const data = await Promise.all(apis);

      let updatedLibs = packageList.map((e, i) => {
        return {
          ...e,
          data: data[i]
        };
      });
      setLibs(updatedLibs);
    }
    callAllApi();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.paperRoot}>
      {libs.map((e, i) => {
        return (
          <Grid item xs={6} md={3} key={i}>
            <PackageCard
              link={e.data.link}
              title={e.data.title}
              desc={e.data.desc}
              version={e.data.version}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default PackageCardGridList;
