import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as PXBThemes from "@pxblue/themes/react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import { Spacer } from "@pxblue/react-components";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

import "./App.css";
import "typeface-roboto";
import { findPos } from "./utils/";
import { npmPackages, designExamples } from "./data/data";

/**
 * Internal COmponents
 */
import TitleDescription from "./components/TitleDescription";
import NpmPackagesSection from "./components/NpmPackagesSection";
import DesignExampleSection from "./components/DesignExampleSection";
import Footer from "./components/Footer";

const styles = theme => ({
  appBar: {
    minHeight: "64px"
  },
  appbarLogo: {
    height: "20px",
    width: "auto",
    float: "right"
  },
  mainContent: {
    padding: "24px",
    margin: "0px auto"
  },
  packageContentBox: {
    marginBottom: "16px"
  },
  npmPackageIcon: {
    padding: "4px"
  },
  paperCardRoot: {
    padding: "4px"
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
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
  packageCardDesc: {
    height: "60px",
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical"
  },
  navigationBullets: {
    top: "70px",
    height: "calc(100vh - 70px)",
    position: "sticky",
    overflowY: "auto"
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.lastRef = null;
    this.state = {
      pagelink: {
        "NPM Packages": [],
        "Design Examples": []
      }
    };
  }

  updatePageLinks = (key, link) => {
    let temp = this.state.pagelink;
    if (temp[key].indexOf(link) === -1) {
      temp[key].push(link);
      this.setState({
        pagelink: temp
      });
    }
  };

  addFocusAndScroll = e => {
    e.preventDefault();
    let requiredElement = e.target.classList.contains("navigationLink")
      ? e.target
      : e.target.parentElement;
    let linkElement = e.target.classList.contains("navigationLink")
      ? e.target.firstChild
      : e.target;

    window.scroll({
      top:
        findPos(
          document.getElementById(linkElement.getAttribute("href").substr(3))
        ) - 80,
      left: 0,
      behavior: "smooth"
    });
    if (this.lastRef) {
      this.lastRef.classList.remove("active-link");
      this.lastRef = requiredElement;
      this.lastRef.classList.add("active-link");
    } else {
      this.lastRef = requiredElement;
      this.lastRef.classList.add("active-link");
    }
  };

  render() {
    const { classes } = this.props;
    let quickNavLinks = [],
      pLinksMain = Object.keys(this.state.pagelink);
    if (Object.keys(this.state.pagelink).length > 0) {
      pLinksMain.forEach((e, i) => {
        quickNavLinks.push(
          <Typography
            variant="caption"
            display="block"
            key={i}
            style={{ marginBottom: "2px", marginLeft: "2px" }}
            paragraph
          >
            {e}
          </Typography>
        );
        this.state.pagelink[e].forEach((f, j) => {
          quickNavLinks.push(
            <Typography
              variant="caption"
              display="block"
              key={`${i}${j}`}
              className="navigationLink pLinkSub"
              onClick={this.addFocusAndScroll}
            >
              <Link href={`./#${f}`} className="nav-link">
                {f}
              </Link>
            </Typography>
          );
        });
      });
    }
    return (
      <MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
        <AppBar position="sticky" color="primary" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6">Resources</Typography>
            <Spacer flex={1} />
            <img
              src="./img/eaton-logo.svg"
              className={classes.appbarLogo}
              alt=""
            />
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item md={10} className={classes.mainContent}>
            <div className="main-content-child">
              <TitleDescription
                variant="h4"
                headerColor="primary"
                headerLink="main-header"
                headerText="Power Xpert Blue Resources"
                description="Power Xpert Blue offers a number of resources for developers,
              available through NPM and Github.These include utility packages as
              well as sample code / design pattern examples."
              />
              <NpmPackagesSection
                data={npmPackages}
                addLink={this.updatePageLinks}
              />
              <DesignExampleSection
                data={designExamples}
                addLink={this.updatePageLinks}
              />
            </div>
          </Grid>
          <Grid item md={2} className={classes.navigationBullets}>
            <Hidden smDown>
              <Typography variant="h6">Contents</Typography>
              {quickNavLinks.length > 0 && quickNavLinks}
            </Hidden>
          </Grid>
        </Grid>
        <Footer />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
