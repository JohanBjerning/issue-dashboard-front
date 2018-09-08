import React, { Component } from "react";
import TableList from "./tablelist.jsx";
import NbrOfIssues from "./nbrofissues.jsx";
import enigma from "enigma.js";
import enigmaConfig from "./enigma-config";
import { githubIssues } from "../definitions";
import "./style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: null,
      error: null
    };
    this.getApp();
    this.firstSection = React.createRef();
    this.secondSection = React.createRef();
  }

  async getApp() {
    const session = enigma.create(enigmaConfig);

    try {
      const global = await session.open();
      const app =
        process.env.NODE_ENV === "production"
          ? await global.getActiveDoc()
          : await global.openDoc("core-issues.qvf");
      
      const field = await app.getField('usertype');
      const value = await field.select("NONE");

      const field2 = await app.getField('iscorerepo');
      const value2 = await field2.select("yes");

      const issuesModel = await app.createSessionObject(githubIssues);
      const issuesLayout = await issuesModel.getLayout();;

      this.setState({
        app,
        issuesModel,
        issuesLayout
      });
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  }

  circleColor(nbr) {
    if (nbr < 3) {
      return "circle full-circle-green";
    }
    if (nbr > 6) {
      return "circle full-circle-red";
    }
    return "circle full-circle-yellow";
  }

  render() {
    const {
      error,
      app,
      issuesLayout,
      issuesModel
    } = this.state;
    if (error) {
      const msg =
        error instanceof Event
          ? "Failed to establish a connection to an Engine"
          : error.message;
      return (
        <div className="errorWrapper">
          <span className="errorText">Oops, something went wrong.</span>
          <span>{msg}</span>
        </div>
      );
    }
    if (!app) {
      return null;
    }
    return (
      <div>
        <div class="header-row"></div>
        <div class={this.circleColor(issuesLayout.qHyperCube.qDataPages[0].qMatrix.length)}></div>
        <div class="row main-container">
          <div class="col-md-4 full-height" key="small">
            <div class="issue-highlight">
              <NbrOfIssues
                layout={issuesLayout}
                model={issuesModel}
              />
            </div>
          </div>
          <div class="col-md-8 full-height" key="big">
            <TableList
              layout={issuesLayout}
              model={issuesModel}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
