import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Position, Tooltip, Intent } from "@blueprintjs/core";

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
                className="bp3-button bp3-minimal non-dragable"
                onClick={this.closeMenu}
              >
                <Icon icon="menu-closed" />
              </button>
            ) : (
              <button
                className="bp3-button bp3-minimal non-dragable"
                onClick={this.openMenu}
              >
                <Icon icon="menu-open" />
              </button>
            )}
            <span className="bp3-navbar-divider" />

            {/* <div className="bp3-navbar-heading"></div> */}
            <Tooltip
              hoverOpenDelay={500}
              content="Home"
              position={Position.BOTTOM}
            >
              <Link to="/home" style={{ textDecoration: "none" }}>
                <button className="bp3-button bp3-minimal non-dragable">
                  <Icon icon="home" />
                </button>
              </Link>
            </Tooltip>
            <span className="bp3-navbar-divider" />
            <Tooltip
              hoverOpenDelay={500}
              content="Tasks"
              position={Position.BOTTOM}
            >
              <Link to="/taskman" style={{ textDecoration: "none" }}>
                <button className="bp3-button bp3-minimal non-dragable bp3-intent-success">
                  <Icon icon="tick-circle" intent={Intent.SUCCESS} />
                </button>
              </Link>
            </Tooltip>
            <Tooltip
              hoverOpenDelay={500}
              content="Notes"
              position={Position.BOTTOM}
            >
              <Link to="/notes" style={{ textDecoration: "none" }}>
                <button className="bp3-button bp3-minimal non-dragable bp3-intent-primary">
                  <Icon icon="control" />
                </button>
              </Link>
            </Tooltip>
            <Tooltip
              hoverOpenDelay={500}
              content="Money"
              position={Position.BOTTOM}
            >
              <Link to="/monies" style={{ textDecoration: "none" }}>
                <button className="bp3-button bp3-minimal non-dragable bp3-intent-danger">
                  <Icon icon="bank-account" />
                </button>
              </Link>
            </Tooltip>
            <span className="bp3-navbar-divider" />
            <Tooltip
              hoverOpenDelay={500}
              content="Calender"
              position={Position.BOTTOM}
            >
              <Link to="/calender" style={{ textDecoration: "none" }}>
                <button className="bp3-button bp3-minimal non-dragable">
                  <Icon icon="calendar" color="#AD99FF" />
                </button>
              </Link>
            </Tooltip>
            <Tooltip
              hoverOpenDelay={500}
              content="Tags"
              position={Position.BOTTOM}
            >
              <Link to="/tagsGallery" style={{ textDecoration: "none" }}>
                <button className="bp3-button bp3-minimal non-dragable">
                  <Icon icon="tag" color="#D1F26D" />
                </button>
              </Link>
            </Tooltip>
            <Tooltip
              hoverOpenDelay={500}
              content="Archives"
              position={Position.BOTTOM}
            >
              <Link to="/archives" style={{ textDecoration: "none" }}>
                <button className="bp3-button bp3-minimal non-dragable">
                  <Icon icon="cube" color="#008075" />
                </button>
              </Link>
            </Tooltip>

            <span className="bp3-navbar-divider" />
            <Tooltip
              hoverOpenDelay={500}
              content="Go Back"
              position={Position.BOTTOM}
            >
              <button
                className="bp3-button bp3-minimal non-dragable"
                onClick={this.goBackward}
              >
                <Icon icon="chevron-left" />
              </button>
            </Tooltip>
            <Tooltip
              hoverOpenDelay={500}
              content="Go Front"
              position={Position.BOTTOM}
            >
              <button
                className="bp3-button bp3-minimal non-dragable"
                onClick={this.goForward}
              >
                <Icon icon="chevron-right" />
              </button>
            </Tooltip>
            <span className="bp3-navbar-divider" />
          </div>

          <div className="bp3-navbar-group bp3-align-right">
            <input
              className="bp3-input bp3-align-left non-dragable"
              placeholder="Search tags..."
              type="text"
            />
            <span className="bp3-navbar-divider" />
            <button className="bp3-button bp3-minimal non-dragable">
              <Icon icon="notifications" />
            </button>
            <Tooltip
              hoverOpenDelay={500}
              content="Settings"
              position={Position.BOTTOM}
            >
              <Link to="/settings" style={{ textDecoration: "none" }}>
                <button className="bp3-button bp3-minimal on-dragable">
                  <Icon icon="cog" />
                </button>
              </Link>
            </Tooltip>
            <button className="bp3-button bp3-minimal non-dragable">
              <Icon icon="user" />
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
