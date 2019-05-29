import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Position, Tooltip } from "@blueprintjs/core";

import history from "../../tools/history";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.closeMenu = this.closeMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  goForward() {
    history.goForward();
  }
  goBackward() {
    history.goBack();
  }

  closeMenu() {
    this.setState({ menuOpen: false });
    this.props.toggleSideBar();
  }
  openMenu() {
    this.setState({ menuOpen: true });
    this.props.toggleSideBar();
  }
  render() {
    return (
      <div className="navBar fixedToTop dragable">
        <nav className="bp3-navbar bp3-dark .modifier">
          <div className="bp3-navbar-group bp3-align-left">
            {this.state.menuOpen ? (
              <button
                className="bp3-button bp3-minimal bp3-icon-menu-closed non-dragable"
                onClick={this.closeMenu}
              />
            ) : (
              <button
                className="bp3-button bp3-minimal bp3-icon-menu-open non-dragable"
                onClick={this.openMenu}
              />
            )}
            <span className="bp3-navbar-divider" />

            <button className="bp3-button bp3-minimal bp3-icon-user non-dragable" />
            {/* <div className="bp3-navbar-heading"></div> */}
            <Tooltip content="Home" position={Position.BOTTOM}>
              <Link to="/app" style={{ textDecoration: "none" }}>
                <button
                  className="bp3-button bp3-minimal bp3-icon-home non-dragable"
                  href="/"
                />
              </Link>
            </Tooltip>
            <span className="bp3-navbar-divider" />
            <button
              className="bp3-button bp3-minimal bp3-icon-chevron-left non-dragable"
              onClick={this.goBackward}
            />
            <button
              className="bp3-button bp3-minimal bp3-icon-chevron-right non-dragable"
              onClick={this.goForward}
            />
          </div>

          <div className="bp3-navbar-group bp3-align-right">
            <input
              className="bp3-input bp3-align-left non-dragable"
              placeholder="Search tags..."
              type="text"
            />
            <span className="bp3-navbar-divider" />
            <button className="bp3-button bp3-minimal bp3-icon-notifications non-dragable" />
            <Link to="/settings">
              <button className="bp3-button bp3-minimal bp3-icon-cog non-dragable" />
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
