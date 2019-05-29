import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/layout/Landing";
import NavBar from "./components/layout/NavBar";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Settings from "./components/dashboard/Settings";
import SideBar from "./components/layout/SideBar";

export default class AppComp extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };

    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    this.setState({ menuOpen: !this.state.menuOpen });
    console.log("Now Menu is" + this.state.menuOpen);
  }

  render() {
    return (
      <div
        className="AppComp"
        // style={{ backgroundColor: "pink" }}
      >
        <Router>
          <NavBar toggleSideBar={this.toggleSideBar} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: this.state.menuOpen
                ? "20% 80%"
                : "3.75% 96.25%"
            }}
          >
            <div style={{ gridColumnStart: "1" }}>
              <SideBar menuOpen={this.state.menuOpen} />
            </div>
            <Route exact path="/" component={Landing} />
            <div style={{ gridColumnStart: "2" }}>
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route path="/app" component={Dashboard} />
              <Route exact path="/settings" component={Settings} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
